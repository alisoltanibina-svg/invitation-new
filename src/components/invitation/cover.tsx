import { FloralDivider, LaurelMonogram, OpenSealButton } from "./ornaments";
import { FallingPetals } from "./petals";
import { ShamsiDate } from "./shamsi-date";
import { invitation } from "@/lib/invitation-data";
import { cn } from "@/lib/utils";

export function Cover({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-dvh flex-col items-center overflow-hidden bg-ivory text-ink",
        opening && "cover-exit",
      )}
      aria-label="روکش دعوت‌نامه"
    >
      <img
        src="/images/envelope.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover object-top"
      />
      <div className="cover-veil absolute inset-0" />
      <FallingPetals />

      <div className="absolute inset-0 z-10 grid place-items-center">
        <LaurelMonogram className="-translate-y-4" />
      </div>

      <div className="relative z-10 mt-auto flex w-full max-w-md flex-col items-center px-8 pb-[max(2.25rem,env(safe-area-inset-bottom))] pt-16 text-center font-display">
        <h1 className="max-w-[16ch] text-[1.75rem] font-bold leading-snug text-ink">
          {invitation.coverTitle}
        </h1>
        <FloralDivider className="my-4 text-gold" />
        <ShamsiDate className="text-lg text-ink-soft" />
        <OpenSealButton
          label={invitation.openLabel}
          opening={opening}
          onOpen={onOpen}
        />
      </div>
    </section>
  );
}
