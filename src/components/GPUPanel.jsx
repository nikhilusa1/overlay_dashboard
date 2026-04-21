import { useState, useEffect } from 'react';

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
function drift(v, min, max, d) { return clamp(v + (Math.random() * d * 2 - d), min, max); }

const INIT = {
  temperature: 65,
  usage: 45,
  vramUsed: 4.0,
  fanSpeed: 1800,
  history: Array(20).fill(65),
};

function meterColor(v, lo, hi) {
  if (v < lo) return 'var(--safe)';
  if (v < hi) return 'var(--warn)';
  return 'var(--danger)';
}

function Meter({ value, max, lo, hi, label, unit }) {
  const pct = Math.min(100, (value / max) * 100);
  const c = meterColor(value, lo, hi);
  return (
    <div className="meter-row">
      <span className="meter-label">{label}</span>
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${pct}%`, background: c }} />
      </div>
      <span className="meter-value" style={{ color: c }}>
        {value < 10 ? value.toFixed(1) : Math.round(value)}{unit}
      </span>
    </div>
  );
}

export function GPUPanel() {
  const [s, setS] = useState(INIT);

  useEffect(() => {
    const id = setInterval(() => {
      setS(p => {
        const temperature = drift(p.temperature, 55, 90, 3);
        const usage = drift(p.usage, 15, 98, 5);
        const vramUsed = parseFloat(drift(p.vramUsed, 2, 8, 0.3).toFixed(1));
        const fanSpeed = Math.round(drift(p.fanSpeed, 800, 3200, 150));
        const history = [...p.history.slice(1), temperature];
        return { temperature, usage, vramUsed, fanSpeed, history };
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const mn = Math.min(...s.history);
  const mx = Math.max(...s.history);
  const range = mx - mn || 1;
  const pts = s.history.map((t, i) => `${(i / 19) * 200},${50 - ((t - mn) / range) * 48}`).join(' ');

  const [badgeClass, badgeText] =
    s.usage < 80 ? ['safe', 'Safe Zone'] :
    s.usage < 92 ? ['warn', 'Near Limit'] :
                   ['danger', 'Over Limit'];

  return (
    <div className="gpu-panel">
      <span className={`safe-badge ${badgeClass}`}>{badgeText}</span>
      <Meter value={s.temperature} max={100} lo={75} hi={85} label="Temp" unit="°C" />
      <Meter value={s.usage}       max={100} lo={70} hi={90} label="GPU"  unit="%" />
      <Meter value={s.vramUsed}    max={8}   lo={6}  hi={7.5} label="VRAM" unit=" GB" />
      <Meter value={s.fanSpeed}    max={3200} lo={2400} hi={3000} label="Fan" unit=" RPM" />
      <div className="chart-label">Temperature (last 20s)</div>
      <svg className="temp-chart" viewBox="0 0 200 50" preserveAspectRatio="none">
        <polyline fill="none" stroke="#a78bfa" strokeWidth="1.5" points={pts} />
      </svg>
    </div>
  );
}
