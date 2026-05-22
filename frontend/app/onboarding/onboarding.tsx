"use client";

import { useState } from "react";
import { Button, Card, SelectInput, Stepper, TextInput } from "../../components/optimize-ui";

type Props = {
  onContinue?: () => void;
};

export default function BrandCreationForm({ onContinue }: Props) {
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="ob-wrap">
      <div className="ob-step-nav">
        <div className="ob-step-item">
          <div className="ob-step-circle done">1</div>
          <div className="ob-step-label">1</div>
        </div>
        <div className="ob-step-line" />
        <div className="ob-step-item">
          <div className="ob-step-circle done">2</div>
          <div className="ob-step-label">2</div>
        </div>
        <div className="ob-step-line" />
        <div className="ob-step-item">
          <div className="ob-step-circle active">3</div>
          <div className="ob-step-label active">3</div>
        </div>
      </div>

      <Card className="ob-card">
        <div className="ob-card-header">
          <div className="ob-tag">AI Visibility Intelligence</div>
          <div className="ob-title">Set up your brand</div>
          <div className="ob-sub">
            Add the brand details we’ll use to measure visibility across AI assistants.
          </div>
        </div>

        <div className="ob-field">
          <label className="ob-label">Brand name</label>
          <div className="ob-input-wrap">
            <span className="ob-input-icon">✦</span>
            <TextInput
              className="ob-input with-icon"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Acme Coffee Roasters"
            />
          </div>
        </div>

        <div className="ob-grid2">
          <div className="ob-field">
            <label className="ob-label">Website URL</label>
            <TextInput
              className="ob-input"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://acmecoffee.com"
            />
          </div>

          <div className="ob-field">
            <label className="ob-label">Category</label>
            <SelectInput
              className="ob-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="E-commerce">E-commerce</option>
              <option value="SaaS / Software">SaaS / Software</option>
              <option value="Local services">Local services</option>
              <option value="Professional services">Professional services</option>
              <option value="Other">Other</option>
            </SelectInput>
          </div>
        </div>

        <div className="ob-field">
          <label className="ob-label">
            Location <span className="ob-optional">Optional</span>
          </label>
          <TextInput
            className="ob-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Kathmandu, Nepal"
          />
        </div>

        <div className="ob-btn-row">
          <Button className="ob-btn-primary" onClick={onContinue}>
            Continue → Add competitors
          </Button>
        </div>

        <div className="ob-hint">Your setup takes less than 2 minutes.</div>
      </Card>

      <style jsx>{`
        .ob-wrap { font-family: var(--font-sans); padding: 1.5rem 0; }
        .ob-step-nav { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 2rem; }
        .ob-step-item { display: flex; align-items: center; gap: 0; }
        .ob-step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; border: 1.5px solid var(--color-border-secondary); background: var(--color-background-primary); color: var(--color-text-secondary); flex-shrink: 0; }
        .ob-step-circle.active { background: #e8531a; border-color: #e8531a; color: #fff; }
        .ob-step-circle.done { background: var(--color-background-success); border-color: var(--color-border-success); color: var(--color-text-success); }
        .ob-step-label { font-size: 12px; color: var(--color-text-secondary); margin-left: 8px; margin-right: 8px; }
        .ob-step-label.active { color: var(--color-text-primary); font-weight: 500; }
        .ob-step-line { width: 32px; height: 1px; background: var(--color-border-tertiary); }
        .ob-card { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 28px 28px 24px; max-width: 520px; margin: 0 auto; }
        .ob-card-header { margin-bottom: 24px; }
        .ob-tag { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 100px; background: #fdf0eb; color: #b83c0e; margin-bottom: 10px; letter-spacing: 0.2px; }
        .ob-title { font-size: 18px; font-weight: 500; color: var(--color-text-primary); margin-bottom: 4px; }
        .ob-sub { font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; }
        .ob-field { margin-bottom: 16px; }
        .ob-label { font-size: 12px; font-weight: 500; color: var(--color-text-secondary); margin-bottom: 6px; display: block; }
        .ob-input-wrap { position: relative; }
        .ob-input { width: 100%; height: 38px; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); font-size: 14px; padding: 0 12px; background: var(--color-background-primary); color: var(--color-text-primary); box-sizing: border-box; }
        .ob-input.with-icon { padding-left: 36px; }
        .ob-input-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); font-size: 15px; color: var(--color-text-tertiary); pointer-events: none; }
        .ob-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ob-select { width: 100%; height: 38px; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); font-size: 14px; padding: 0 12px; background: var(--color-background-primary); color: var(--color-text-primary); box-sizing: border-box; }
        .ob-optional { font-size: 11px; color: var(--color-text-tertiary); margin-left: 4px; font-weight: 400; }
        .ob-btn-row { display: flex; gap: 10px; align-items: center; margin-top: 8px; }
        .ob-btn-primary { background: #e8531a; color: #fff; border: none; border-radius: var(--border-radius-md); font-size: 14px; font-weight: 500; padding: 10px 20px; cursor: pointer; flex: 1; }
        .ob-btn-ghost { background: transparent; color: var(--color-text-secondary); border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); font-size: 14px; padding: 10px 16px; cursor: pointer; }
        .ob-hint { font-size: 12px; color: var(--color-text-tertiary); margin-top: 4px; }
        .ob-divider { border: none; border-top: 0.5px solid var(--color-border-tertiary); margin: 18px 0; }
        .comp-row { display: flex; gap: 8px; align-items: center; margin-bottom: 10px; }
        .comp-num { width: 22px; height: 22px; border-radius: 50%; background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--color-text-secondary); font-weight: 500; flex-shrink: 0; }
        .comp-input { flex: 1; height: 36px; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); font-size: 13px; padding: 0 10px; background: var(--color-background-primary); color: var(--color-text-primary); }
        .comp-input.filled { border-color: #e8531a; background: #fdf0eb; }
        .comp-badge { font-size: 10px; padding: 2px 8px; border-radius: 100px; background: var(--color-background-success); color: var(--color-text-success); font-weight: 500; white-space: nowrap; }
        .comp-badge-gray { font-size: 10px; padding: 2px 8px; border-radius: 100px; background: var(--color-background-secondary); color: var(--color-text-tertiary); font-weight: 500; white-space: nowrap; }
      `}</style>
    </div>
  );
}

