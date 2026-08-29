import { cn } from "@/lib/utils";

export function FloralDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 36"
      className={cn("mx-auto h-8 w-56 text-gold", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 18 H112"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M168 18 H270"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M140 6 C146 12 146 24 140 30 C134 24 134 12 140 6 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <circle cx="140" cy="18" r="2.2" fill="currentColor" />
      <path
        d="M118 18 C124 10 132 10 140 18 C148 10 156 10 162 18"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M118 18 C124 26 132 26 140 18 C148 26 156 26 162 18"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export function CornerFlourish({
  className,
  flipX,
  flipY,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-14 text-gold", className)}
      style={{
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 8 C8 28 12 40 32 48 C20 36 18 22 22 8"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.85"
      />
      <path
        d="M8 8 C28 8 40 12 48 32 C36 20 22 18 8 22"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.85"
      />
      <path
        d="M12 28 C18 22 28 22 32 28 C26 26 18 30 12 28 Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
    </svg>
  );
}

export function LaurelMonogram({ className }: { className?: string }) {
  return (
    <img
      src="/images/monogram-as.jpg"
      alt=""
      className={cn(
        "size-52 rounded-full object-cover shadow-[0_16px_40px_rgba(36,51,44,0.28)] ring-1 ring-gold/35",
        className,
      )}
    />
  );
}

function LaurelSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 48"
      className={cn("h-10 w-7", className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 46 C17 32 16 18 18 4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M18 8 C10 6 6 12 8 16 C12 14 16 12 18 12 Z" />
      <path d="M18 8 C26 6 30 12 28 16 C24 14 20 12 18 12 Z" />
      <path d="M18 16 C9 15 5 22 8 26 C13 23 16 20 18 20 Z" />
      <path d="M18 16 C27 15 31 22 28 26 C23 23 20 20 18 20 Z" />
      <path d="M18 24 C10 24 6 31 9 34 C13 31 16 28 18 28 Z" />
      <path d="M18 24 C26 24 30 31 27 34 C23 31 20 28 18 28 Z" />
      <path d="M18 32 C11 33 8 39 11 41 C14 38 17 36 18 36 Z" />
      <path d="M18 32 C25 33 28 39 25 41 C22 38 19 36 18 36 Z" />
    </svg>
  );
}

export function OpenSealButton({
  label,
  opening,
  onOpen,
}: {
  label: string;
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={opening}
      aria-label={label}
      className="seal-pulse group mt-8 inline-flex h-[3.6rem] items-center gap-2 rounded-full border border-[#e8dcc8]/85 bg-forest px-6 text-ivory shadow-[0_14px_32px_rgba(36,51,44,0.32)] transition-transform duration-[var(--motion-fast)] active:scale-[0.97] disabled:opacity-70"
    >
      <LaurelSprig className="text-[#e8dcc8]" />
      <span className="px-1 font-display text-lg tracking-wide">{label}</span>
      <LaurelSprig className="text-[#e8dcc8]" />
    </button>
  );
}
