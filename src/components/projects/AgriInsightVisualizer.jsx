'use client';

import React, { useState } from 'react';
import { Sprout, BarChart, Sliders, Database } from 'lucide-react';

export default function AgriInsightVisualizer() {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedSeason, setSelectedSeason] = useState('Rabi');
  const [areaHectares, setAreaHectares] = useState(120);

  // Approximate deterministic response based on model weights
  const baseYields = {
    Wheat: 3.4,
    Rice: 2.8,
    Maize: 2.9,
    Cotton: 1.6,
    Sugarcane: 68.5,
  };

  const seasonMultipliers = {
    Kharif: 1.05,
    Rabi: 1.15,
    WholeYear: 1.0,
    Summer: 0.92,
  };

  const calculatedYield = (
    (baseYields[selectedCrop] || 3.0) *
    (seasonMultipliers[selectedSeason] || 1.0) *
    (1 + Math.log10(areaHectares) * 0.05)
  ).toFixed(2);

  const featureImportances = [
    { feature: 'District Target Encoding', weight: 42, color: 'bg-emerald-500' },
    { feature: 'Crop Categorical One-Hot', weight: 28, color: 'bg-cyan-500' },
    { feature: 'Cultivation Area (Scaled)', weight: 16, color: 'bg-indigo-500' },
    { feature: 'Season & Year Temporal', weight: 14, color: 'bg-violet-500' },
  ];

  return (
    <div className="w-full rounded-2xl glass-panel p-5 sm:p-7 border border-white/[0.08] shadow-2xl overflow-hidden">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              AgriInsight ML Pipeline &amp; Prediction Engine
            </h4>
            <p className="text-xs font-mono text-zinc-400">
              ColumnTransformer &bull; RandomForestRegressor &bull; Streamlit
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 font-medium">
            Test R² ≈ 0.80
          </span>
        </div>
      </div>

      {/* Simulator & Feature Importance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        
        {/* Interactive Prediction Controls */}
        <div className="lg:col-span-6 p-4 rounded-xl bg-surface-300/70 border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 mb-4">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>INTERACTIVE PARAMETER INFERENCE</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 mb-1.5 block">
                  Select Crop:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane'].map((crop) => (
                    <button
                      key={crop}
                      onClick={() => setSelectedCrop(crop)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all ${
                        selectedCrop === crop
                          ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                          : 'bg-surface-100 border border-white/[0.06] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 mb-1.5 block">
                  Agricultural Season:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Rabi', 'Kharif', 'WholeYear', 'Summer'].map((season) => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all ${
                        selectedSeason === season
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                          : 'bg-surface-100 border border-white/[0.06] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-300">Cultivation Area:</span>
                  <span className="font-mono text-cyan-300">{areaHectares} Hectares</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={areaHectares}
                  onChange={(e) => setAreaHectares(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-surface-100 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Model Output Card */}
          <div className="mt-5 p-3.5 rounded-xl bg-anthracite-900 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                Forecasted Crop Yield
              </span>
              <span className="text-2xl font-bold font-display text-emerald-400">
                {calculatedYield} <span className="text-xs font-mono text-zinc-300">tonnes/ha</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-400 block">Model Size</span>
              <span className="text-xs font-mono text-zinc-200">24.5 MB Pipeline</span>
            </div>
          </div>
        </div>

        {/* Feature Importance & Preprocessing Architecture */}
        <div className="lg:col-span-6 p-4 rounded-xl bg-surface-300/70 border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-4">
              <span className="flex items-center gap-1.5">
                <BarChart className="w-4 h-4 text-emerald-400" />
                <span>FEATURE IMPORTANCE (GINI IMPURITY)</span>
              </span>
              <span className="text-zinc-400 text-[10px]">Scikit-learn Model</span>
            </div>

            <div className="space-y-3.5">
              {featureImportances.map((item) => (
                <div key={item.feature}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-zinc-300 font-mono text-[11px]">{item.feature}</span>
                    <span className="font-mono text-zinc-400">{item.weight}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-lg bg-surface-200/50 border border-white/[0.05] text-xs text-zinc-300 leading-relaxed">
              <span className="font-semibold text-white">TargetEncoder Design Rationale:</span> By target-encoding high-cardinality district features rather than one-hot encoding, the model captures geographic micro-climate variance while keeping the memory footprint down to ~24.5 MB.
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>340,000+ Agricultural Records</span>
            </span>
            <span className="text-emerald-400">Supervised Ensemble</span>
          </div>
        </div>

      </div>

      {/* Verified Pipeline Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]">
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Dataset Scale</span>
          <span className="text-sm font-semibold text-white">340,000+ Records</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Constrained Test R²</span>
          <span className="text-sm font-semibold text-emerald-400">≈ 0.80 Metric</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Dimensionality</span>
          <span className="text-sm font-semibold text-white">TargetEncoder</span>
        </div>
        <div className="p-3 rounded-xl bg-surface-200/40 border border-white/[0.05]">
          <span className="text-[10px] font-mono text-zinc-400 block uppercase">Interface</span>
          <span className="text-sm font-semibold text-white">Streamlit 3-Panel</span>
        </div>
      </div>
    </div>
  );
}
