import { useState } from 'react';
import { Panel } from './Panel';
import { GPUPanel } from './GPUPanel';
import { ICATPanel } from './ICATPanel';
import { BugDecoderPanel } from './BugDecoderPanel';
import { LauncherBar } from './LauncherBar';

const PANELS = [
  { id: 'gpu',  label: 'GPU',         title: 'GPU Control Center', Component: GPUPanel,        pos: { x: 40,  y: 60  } },
  { id: 'icat', label: 'ICAT',        title: 'Mini ICAT',          Component: ICATPanel,       pos: { x: 420, y: 60  } },
  { id: 'bug',  label: 'Bug Decoder', title: 'Bug Decoder',        Component: BugDecoderPanel, pos: { x: 40,  y: 430 } },
];

export function Desktop() {
  const [open, setOpen] = useState({ gpu: true, icat: true, bug: true });
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }));

  return (
    <div className="desktop">
      {PANELS.map(({ id, title, Component, pos }) =>
        open[id] && (
          <Panel key={id} title={title} onClose={() => toggle(id)} initialPos={pos}>
            <Component />
          </Panel>
        )
      )}
      <LauncherBar
        panels={PANELS.map(({ id, label }) => ({ id, label, open: !!open[id] }))}
        onToggle={toggle}
      />
    </div>
  );
}
