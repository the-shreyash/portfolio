const themes = {
  finance: {
    bg: "linear-gradient(155deg, #0d0d12 0%, #171722 60%, #201a3a 100%)",
    accent: "#7c8bff",
  },
  warm: {
    bg: "linear-gradient(155deg, #1c1210 0%, #2a1a14 60%, #3a2418 100%)",
    accent: "#ff9d6c",
  },
  technical: {
    bg: "linear-gradient(155deg, #0c0e10 0%, #131619 60%, #1a2024 100%)",
    accent: "#5fe3c0",
  },
};

export default function ProjectVisual({ theme = "finance", projectId, image }) {
  const t = themes[theme] || themes.finance;

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-xl)] md:rounded-[var(--radius-2xl)]"
      style={{ background: t.bg }}
    >
      {/* Real screenshot — shown when image is provided */}
      {image && (
        <img
          src={image}
          alt={`${projectId} screenshot`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          onError={(e) => { e.target.style.display = "none"; }} // fallback to placeholder on 404
        />
      )}

      {/* Grid overlay — shows on top of photo, purely decorative */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated placeholder visuals — visible when no image is provided */}
      {!image && projectId === "stockassist-ai" && <StockVisual accent={t.accent} />}
      {!image && projectId === "petverse" && <PetVisual accent={t.accent} />}
      {!image && projectId === "dev-handbook" && <DocsVisual accent={t.accent} />}

      {/* Bottom gradient for readability when showing a screenshot */}
      {image && (
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      )}
    </div>
  );
}


function Panel({ className = "", children }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function StockVisual({ accent }) {
  return (
    <div className="absolute inset-0 grid grid-cols-3 gap-3 p-4 text-white md:gap-4 md:p-8">
      <Panel className="col-span-2 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
          <span>NIFTY 50</span>
          <span style={{ color: accent }}>+1.24%</span>
        </div>
        <svg viewBox="0 0 200 60" className="h-16 w-full" preserveAspectRatio="none">
          <polyline
            points="0,45 20,40 40,42 60,30 80,32 100,20 120,24 140,12 160,16 180,6 200,10"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
        </svg>
      </Panel>
      <Panel className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-widest text-white/50">
          AI Analysis
        </span>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-4/5 rounded bg-white/10" />
          <div className="h-1.5 w-2/3 rounded" style={{ background: accent, opacity: 0.6 }} />
        </div>
      </Panel>
      <Panel className="flex flex-col justify-between text-[11px]">
        <span className="text-[10px] uppercase tracking-widest text-white/50">Watchlist</span>
        <div className="space-y-1 text-white/70">
          <div className="flex justify-between"><span>BANKNIFTY</span><span style={{ color: accent }}>▲</span></div>
          <div className="flex justify-between"><span>SENSEX</span><span className="text-white/40">▲</span></div>
        </div>
      </Panel>
      <Panel className="col-span-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Trade Monitor</span>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />
      </Panel>
    </div>
  );
}

function PetVisual({ accent }) {
  return (
    <div className="absolute inset-0 grid grid-cols-3 gap-3 p-4 text-white md:gap-4 md:p-8">
      <Panel className="col-span-1 flex flex-col items-center justify-center gap-2">
        <div
          className="h-14 w-14 rounded-full"
          style={{ background: `${accent}33`, border: `1px solid ${accent}` }}
        />
        <span className="text-[10px] uppercase tracking-widest text-white/50">Profile</span>
      </Panel>
      <Panel className="col-span-2 flex flex-col justify-between">
        <span className="text-[10px] uppercase tracking-widest text-white/50">
          AI Breed Recognition
        </span>
        <div className="flex gap-2">
          <div className="h-16 flex-1 rounded-lg bg-white/[0.06]" />
          <div className="h-16 flex-1 rounded-lg" style={{ background: `${accent}22` }} />
        </div>
      </Panel>
      <Panel className="col-span-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Community</span>
        <span>Clinics</span>
        <span>Adoption</span>
        <span style={{ color: accent }}>Shop</span>
      </Panel>
    </div>
  );
}

function DocsVisual({ accent }) {
  return (
    <div className="absolute inset-0 grid grid-cols-3 gap-3 p-4 text-white md:gap-4 md:p-8">
      <Panel className="col-span-1 flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-widest text-white/50">Topics</span>
        {["Getting Started", "Architecture", "API Reference"].map((t) => (
          <div key={t} className="rounded bg-white/[0.06] px-2 py-1.5 text-[10px] text-white/60">
            {t}
          </div>
        ))}
      </Panel>
      <Panel className="col-span-2 flex flex-col gap-2 font-mono text-[10px] text-white/60">
        <span className="uppercase tracking-widest text-white/50">Code</span>
        <div className="space-y-1">
          <div className="h-1.5 w-3/4 rounded" style={{ background: accent, opacity: 0.5 }} />
          <div className="h-1.5 w-1/2 rounded bg-white/10" />
          <div className="h-1.5 w-2/3 rounded bg-white/10" />
        </div>
      </Panel>
      <Panel className="col-span-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/50">
        <span>Search</span>
        <span style={{ color: accent }}>Progress 68%</span>
      </Panel>
    </div>
  );
}
