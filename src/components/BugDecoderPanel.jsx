import { useState } from 'react';

const PATTERNS = [
  { ext: ['.log'],        sev: 'medium',           msg: 'Log file may be growing too large — consider clearing it to free space.' },
  { ext: ['.tmp'],        sev: 'low',              msg: 'Temporary file not cleaned up — safe to delete if no app is using it.' },
  { ext: ['.dll'],        sev: 'contact provider', msg: 'System library — do not modify; contact your main provider if you are seeing errors.' },
  { ext: ['.exe'],        sev: 'medium',           msg: 'Executable file — make sure this is from a trusted source before running it.' },
  { ext: ['.cfg','.ini'], sev: 'low',              msg: 'Config file — small changes here can affect how an app behaves.' },
  { ext: ['.bat','.cmd'], sev: 'medium',           msg: 'Script file — runs commands automatically; review before executing.' },
  { ext: ['.sys'],        sev: 'contact provider', msg: 'System file — do not delete or modify; contact your provider if you see related errors.' },
  { ext: ['.reg'],        sev: 'contact provider', msg: 'Registry file — modifying this can affect your entire system.' },
  { ext: ['.dat'],        sev: 'low',              msg: 'Data file — may contain app settings or save data; do not delete while the app is running.' },
  { ext: ['.bak'],        sev: 'low',              msg: 'Backup file — created automatically; safe to delete if you no longer need the backup.' },
  { ext: ['.cache'],      sev: 'low',              msg: 'Cache file — stores temporary data to speed things up; safe to clear.' },
  { ext: ['.db','.sqlite'],sev: 'medium',          msg: 'Database file — contains structured data; do not delete while any app is running.' },
  { ext: ['.json'],       sev: 'low',              msg: 'Config or data file in JSON format — editable, but watch your formatting.' },
  { ext: ['.xml'],        sev: 'low',              msg: 'Structured data file — used by many apps for settings or content.' },
  { ext: ['.lock'],       sev: 'low',              msg: 'Lock file — only safe to delete if the related app is fully closed.' },
];

const SEV_CLASS = {
  'low':              'severity-low',
  'medium':           'severity-medium',
  'contact provider': 'severity-critical',
};

function scan(name) {
  const lower = name.toLowerCase();
  return PATTERNS.find(p => p.ext.some(e => lower.endsWith(e)))
    || { sev: 'low', msg: 'No known issues found with this file type.' };
}

export function BugDecoderPanel() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const go = () => { if (input.trim()) setResult(scan(input.trim())); };

  return (
    <div className="bug-panel">
      <div className="bug-input-row">
        <input
          className="bug-input"
          type="text"
          placeholder="Enter a filename (e.g. error.log)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && go()}
        />
        <button className="scan-btn" onClick={go}>Scan</button>
      </div>
      {result && (
        <div className="bug-result">
          <span className={`severity-tag ${SEV_CLASS[result.sev]}`}>{result.sev}</span>
          <p className="bug-message">{result.msg}</p>
        </div>
      )}
    </div>
  );
}
