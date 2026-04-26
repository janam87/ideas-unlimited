interface MandalaProps {
  className?: string;
  size?: number;
}

export function Mandala({ className = "", size = 200 }: MandalaProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="98" />
      <circle cx="100" cy="100" r="82" />
      <circle cx="100" cy="100" r="64" />
      <circle cx="100" cy="100" r="42" />
      <circle cx="100" cy="100" r="22" />
      <circle cx="100" cy="100" r="8" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 16;
        const x1 = 100 + Math.cos(a) * 22;
        const y1 = 100 + Math.sin(a) * 22;
        const x2 = 100 + Math.cos(a) * 98;
        const y2 = 100 + Math.sin(a) * 98;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 8 + Math.PI / 16;
        const cx = 100 + Math.cos(a) * 53;
        const cy = 100 + Math.sin(a) * 53;
        return <circle key={i} cx={cx} cy={cy} r="10" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 8;
        const cx = 100 + Math.cos(a) * 73;
        const cy = 100 + Math.sin(a) * 73;
        return <circle key={i} cx={cx} cy={cy} r="6" />;
      })}
    </svg>
  );
}
