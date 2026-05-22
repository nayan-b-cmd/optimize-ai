-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "category" TEXT,
    "location" TEXT,
    "brandSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisibilityRun" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "delta" INTEGER NOT NULL,
    "mentionRate" INTEGER NOT NULL,
    "avgPosition" DOUBLE PRECISION NOT NULL,
    "queryCoverage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisibilityRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "visibilityRunId" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "estLift" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceRow" (
    "id" TEXT NOT NULL,
    "visibilityRunId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvidenceRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceResult" (
    "id" TEXT NOT NULL,
    "evidenceRowId" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "llm" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvidenceResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brandSlug_key" ON "Brand"("brandSlug");

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisibilityRun" ADD CONSTRAINT "VisibilityRun_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_visibilityRunId_fkey" FOREIGN KEY ("visibilityRunId") REFERENCES "VisibilityRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceRow" ADD CONSTRAINT "EvidenceRow_visibilityRunId_fkey" FOREIGN KEY ("visibilityRunId") REFERENCES "VisibilityRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceResult" ADD CONSTRAINT "EvidenceResult_evidenceRowId_fkey" FOREIGN KEY ("evidenceRowId") REFERENCES "EvidenceRow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
