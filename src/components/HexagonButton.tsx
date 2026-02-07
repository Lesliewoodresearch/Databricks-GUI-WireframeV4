interface HexagonButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export function HexagonButton({ isActive, onClick }: HexagonButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative group"
      aria-label="Research Panel Toggle"
    >
      {/* Hexagon SVG */}
      <svg
        width="160"
        height="180"
        viewBox="0 0 160 180"
        className="transition-transform duration-300 hover:scale-105"
      >
        {/* Outer glow when active */}
        {isActive && (
          <polygon
            points="80,10 150,50 150,130 80,170 10,130 10,50"
            fill="none"
            stroke="#fb923c"
            strokeWidth="3"
            className="animate-pulse"
            opacity="0.5"
          />
        )}
        
        {/* Main hexagon */}
        <polygon
          points="80,15 145,52 145,128 80,165 15,128 15,52"
          fill={isActive ? "#ea580c" : "#0f172a"}
          stroke={isActive ? "#fb923c" : "#475569"}
          strokeWidth="2"
          className="transition-all duration-300"
        />
        
        {/* Inner hexagon for depth */}
        <polygon
          points="80,25 135,57 135,123 80,155 25,123 25,57"
          fill="none"
          stroke={isActive ? "#fdba74" : "#334155"}
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* Research text */}
        <text
          x="80"
          y="95"
          textAnchor="middle"
          fill={isActive ? "#fff" : "#cbd5e1"}
          className="text-xl transition-colors duration-300"
          style={{ fontWeight: 600 }}
        >
          Research
        </text>
      </svg>

      {/* Hover hint */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-slate-400">
          {isActive ? 'Close Panel' : 'Open Panel'}
        </span>
      </div>
    </button>
  );
}
