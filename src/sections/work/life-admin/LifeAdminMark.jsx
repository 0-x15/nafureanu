/**
 * Life Admin's own mark: a shield with a check inside a rounded
 * square, drawn as strokes in the current text colour so it stays
 * crisp at any size (vectorised from the product's logo).
 */
export default function LifeAdminMark({ className = "", title = undefined }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.8"
      strokeLinejoin="miter"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      className={className}
    >
      {title && <title>{title}</title>}
      <rect x="1.9" y="1.9" width="60.2" height="60.2" rx="9" />
      <path d="M41.4 17.6 L31.5 13.9 L16.1 19.6 V33.2 C16.1 41.2 23 46.8 31.5 50.7 C40 46.8 47.6 41.2 47.6 33.2 V25.4" />
      <path d="M23.4 28.7 L31 36.3 L50.3 13.6" />
    </svg>
  );
}
