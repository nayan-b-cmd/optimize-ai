# backend/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from typing import List, Optional, Dict
from datetime import datetime

# ===================
# Database setup
# ===================
DATABASE_URL = "sqlite:///./optimize_ai.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ===================
# SQLAlchemy models
# ===================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String, default="user")
    plan = Column(String, default="free")  # free, premium, agency
    created_at = Column(DateTime, default=datetime.utcnow)

class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    type = Column(Enum("solo", "agency", name="workspace_type"), default="solo")
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="workspaces")

User.workspaces = relationship("Workspace", back_populates="user")

class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    url = Column(String)
    category = Column(String)
    location = Column(String, nullable=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    workspace = relationship("Workspace", back_populates="brands")

Workspace.brands = relationship("Brand", back_populates="workspace")

class Competitor(Base):
    __tablename__ = "competitors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    url = Column(String)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    brand = relationship("Brand", back_populates="competitors")

Brand.competitors = relationship("Competitor", back_populates="brand")

class VisibilityRun(Base):
    __tablename__ = "visibility_runs"

    id = Column(Integer, primary_key=True, index=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    brand = relationship("Brand", back_populates="runs")
    run_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="completed")  # pending, completed, failed
    score = Column(Float)  # 0–100

Brand.runs = relationship("VisibilityRun", back_populates="brand")

class MentionResult(Base):
    __tablename__ = "mention_results"

    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(Integer, ForeignKey("visibility_runs.id"))
    run = relationship("VisibilityRun", back_populates="mention_results")
    prompt_id = Column(String)  # e.g., "category_prompts.1"
    brand_mentioned = Column(Boolean)
    position = Column(Integer)  # 1st, 2nd, 3rd, ...
    raw_response = Column(String)

VisibilityRun.mention_results = relationship("MentionResult", back_populates="run")

class ChecklistItem(Base):
    __tablename__ = "checklist_items"

    id = Column(Integer, primary_key=True, index=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    brand = relationship("Brand", back_populates="checklist_items")
    type = Column(String)  # content, schema, authority, etc.
    impact = Column(Enum("high", "medium", "low", name="impact_level"))
    description = Column(String)
    status = Column(String, default="todo")  # todo, done
    created_at = Column(DateTime, default=datetime.utcnow)

Brand.checklist_items = relationship("ChecklistItem", back_populates="brand")

Base.metadata.create_all(bind=engine)

# ===================
# Pydantic models (API DTOs)
# ===================
class UserBase(BaseModel):
    email: str

class BrandCreate(BaseModel):
    name: str
    url: str
    category: str
    location: Optional[str] = None

class CompetitorCreate(BaseModel):
    name: str
    url: str

class RunCreate(BaseModel):
    brand_id: int

class DashboardResponse(BaseModel):
    score: float
    trend: List[Dict[str, float]]
    mentions_by_prompt: Dict[str, int]
    checklist: List[Dict]

# ===================
# Helpers: mock LLM + scoring
# ===================
def run_visibility_check(db, brand, competitors):
    # Mock LLM call: just return fake responses.
    prompts = [
        f"What is the best {brand.category} in your city?",
        f"Which {brand.category} is the most popular near {brand.location or 'my area'}?",
        "Which credit card is best for travel points?",
        "Which smartphones are best in 2026?",
        "Which SaaS tools are best for AI visibility?",
    ]

    run = VisibilityRun(brand_id=brand.id, status="pending")
    db.add(run)
    db.flush()

    total_queries = 0
    total_mentions = 0
    positions = []

    query_categories = set()

    for i, prompt in enumerate(prompts):
        # Simple mock: sometimes mention brand, sometimes not, and sometimes mention competitors
        total_queries += 1
        query_categories.add(prompt.split()[0].lower())  # crude “query category”

        # 70% chance the brand is mentioned
        if True:  # in reality, you’d call an LLM here
            total_mentions += 1
            # positions 1–5 allowed
            pos = (i % 5) + 1
            positions.append(pos)

            # Log mention
            db.add(MentionResult(
                run_id=run.id,
                prompt_id=f"mock_{i}",
                brand_mentioned=True,
                position=pos,
                raw_response=f"Model says: I recommend {brand.name} for this query."
            ))
        else:
            db.add(MentionResult(
                run_id=run.id,
                prompt_id=f"mock_{i}",
                brand_mentioned=False,
                position=0,
                raw_response="No mention of this brand."
            ))

    # Compute score
    mention_rate = total_mentions / total_queries if total_queries > 0 else 0
    avg_pos = sum(positions) / len(positions) if positions else 10
    # invert position: 1st = 1.0; 5th = 0.2
    pos_weight = max(0, 1 - (avg_pos - 1) / 4)

    coverage = len(query_categories) / 5  # assume 5 query types

    score = (
        mention_rate * 0.50 +
        pos_weight * 0.35 +
        coverage * 0.15
    ) * 100

    run.score = max(0, min(100, score))
    run.status = "completed"

    # Generate a simple checklist (no LLM in this minimal version)
    checklist = [
        ChecklistItem(
            brand_id=brand.id,
            type="content",
            impact="high",
            description="Create more category‑specific pages for your website."
        ),
        ChecklistItem(
            brand_id=brand.id,
            type="schema",
            impact="medium",
            description="Add schema.org markup for your products or services."
        ),
        ChecklistItem(
            brand_id=brand.id,
            type="authority",
            impact="medium",
            description="Build links from high‑authority industry sites."
        ),
        ChecklistItem(
            brand_id=brand.id,
            type="content",
            impact="low",
            description="Add location pages for each city you serve."
        ),
    ]

    for item in checklist:
        db.add(item)

    db.commit()
    db.refresh(run)
    return run

# ===================
# FastAPI app
# ===================
app = FastAPI(title="optimize.ai - AI Visibility Score API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# You would add real auth later (Firebase / Google OAuth / JWT).
# For now, this is a fake user.
mock_user = User(email="test@example.com", role="user", plan="free")

@app.post("/auth/register", response_model=UserBase)
async def register():
    return mock_user

@app.post("/auth/login", response_model=UserBase)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return mock_user

@app.post("/workspaces")
async def create_workspace(name: str, db=Depends(get_db)):
    workspace = Workspace(name=name, user_id=1)
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    return workspace

@app.post("/brands")
async def create_brand(brand_data: BrandCreate, db=Depends(get_db)):
    brand = Brand(**brand_data.dict())
    brand.workspace_id = 1  # hardcode for now
    db.add(brand)
    db.commit()
    db.refresh(brand)
    return brand

@app.post("/brands/{brand_id}/competitors")
async def add_competitor(brand_id: int, comp_data: CompetitorCreate, db=Depends(get_db)):
    brand = db.query(Brand).get(brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    comp = Competitor(name=comp_data.name, url=comp_data.url, brand_id=brand_id)
    db.add(comp)
    db.commit()
    db.refresh(comp)
    return comp

@app.post("/runs/{brand_id}")
async def trigger_visibility_run(brand_id: int, run_data: RunCreate, db=Depends(get_db)):
    brand = db.query(Brand).get(brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    run = run_visibility_check(db, brand, brand.competitors)
    return {"run_id": run.id, "score": run.score}

@app.get("/dashboard/{brand_id}", response_model=DashboardResponse)
async def get_dashboard(brand_id: int, db=Depends(get_db)):
    brand = db.query(Brand).get(brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    runs = db.query(VisibilityRun).filter(VisibilityRun.brand_id == brand_id).order_by(VisibilityRun.run_at).all()
    trend = [{"run_at": r.run_at.isoformat(), "score": r.score} for r in runs]

    # mentions by prompt
    mentions_by_prompt = {}
    for run in runs:
        for res in run.mention_results:
            key = res.prompt_id
            if key not in mentions_by_prompt:
                mentions_by_prompt[key] = 0
            if res.brand_mentioned:
                mentions_by_prompt[key] += 1

    # checklist
    checklist = [
        {
            "type": item.type,
            "impact": item.impact,
            "description": item.description,
            "status": item.status
        }
        for item in brand.checklist_items
    ]

    return DashboardResponse(
        score=runs[-1].score if runs else 0,
        trend=trend,
        mentions_by_prompt=mentions_by_prompt,
        checklist=checklist
    )
