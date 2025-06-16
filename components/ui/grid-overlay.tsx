interface GridOverlayProps {
  className?: string;
  opacity?: number;
}

export function GridOverlay({
  className = "",
  opacity = 0.2,
}: GridOverlayProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {/* Mobile grid lines */}
      <div className="block md:hidden">
        {/* Vertical lines for mobile - responsive grid */}
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={`mobile-vertical-${i}`}
            className="absolute top-0 w-px h-full bg-white"
            style={{
              left: `${20 + i * 25}%`,
            }}
          />
        ))}

        {/* Horizontal lines for mobile */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`mobile-horizontal-${i}`}
            className="absolute left-0 w-full h-px bg-white"
            style={{
              top: `${15 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Desktop grid lines */}
      <div className="hidden md:block">
        {/* Vertical lines for desktop - centered grid */}
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={`desktop-vertical-${i}`}
            className="absolute top-0 w-px h-[430px] bg-white"
            style={{
              left: `${20 + i * 10}%`,
            }}
          />
        ))}

        {/* Horizontal lines for desktop */}
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`desktop-horizontal-${i}`}
            className="absolute left-0 w-full h-px bg-white"
            style={{
              top: `${10 + i * 30}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
