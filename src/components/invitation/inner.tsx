import type { ReactNode } from "react";
import { Calendar, ChevronLeft, Clock, Heart, MapPin, Moon, Sparkles, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { invitation } from "@/lib/invitation-data";
import { formatJalaliLong } from "@/lib/persian";
import { CornerFlourish, FloralDivider } from "./ornaments";
import { Countdown } from "./countdown";
import { Location } from "./location";
import { MusicButton } from "./music-button";
import { Rsvp } from "./rsvp";
import { ShamsiDate } from "./shamsi-date";

const scheduleIcons = {
  "۱۹:۰۰": Sparkles,
  "۲۰:۰۰": Heart,
  "۲۱:۰۰": UtensilsCrossed,
  "۲۲:۰۰": Moon,
} as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Inner({
  musicOn,
  onMusicToggle,
}: {
  musicOn: boolean;
  onMusicToggle: () => void;
}) {
  const { jalali } = invitation;
  const dateFull = `${jalali.weekday}، ${formatJalaliLong(jalali)}`;

  return (
    <div className="relative min-h-dvh bg-wine-deep text-ivory">
      <img
        src="/images/garden.jpg"
        alt=""
        className="pointer-events-none fixed inset-0 size-full object-cover opacity-30"
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-wine-deep/80 via-wine/70 to-wine-deep" />

      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col pt-6">
        <div className="fixed top-5 start-4 z-30">
          <MusicButton playing={musicOn} onToggle={onMusicToggle} />
        </div>

        <article className="inner-enter relative mx-3 mb-8 overflow-hidden rounded-3xl border-2 border-gold bg-ivory text-ink shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <CornerFlourish className="pointer-events-none absolute start-3 top-3 z-10 size-12 text-gold" />
          <CornerFlourish
            flipX
            className="pointer-events-none absolute end-3 top-3 z-10 size-12 text-gold"
          />
          <CornerFlourish
            flipY
            className="pointer-events-none absolute start-3 bottom-3 z-10 size-12 text-gold"
          />
          <CornerFlourish
            flipX
            flipY
            className="pointer-events-none absolute end-3 bottom-3 z-10 size-12 text-gold"
          />

          <header className="relative aspect-[3/4] overflow-hidden">
            <img
              src="/images/couple-veiled.jpg"
              alt="عروس و داماد در باغ، از پشت"
              className="size-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(244_235_224)_0%,rgb(244_235_224_/_0.86)_10%,rgb(244_235_224_/_0.12)_24%,transparent_36%,rgb(244_235_224_/_0.08)_50%,rgb(244_235_224_/_0.45)_68%,rgb(244_235_224_/_0.88)_86%,rgb(244_235_224)_100%)]" />
            <p className="absolute inset-x-0 top-0 z-20 px-12 pt-5 text-center font-display text-2xl font-bold leading-relaxed text-bronze">
              {invitation.bismillah}
            </p>
          </header>

          <div className="relative z-20 -mt-14 px-6 pb-4 pt-1 text-center">
            <h1 className="font-display text-[2.85rem] font-bold leading-[1.5] text-ink">
              {invitation.bride}
            </h1>
            <p className="font-display text-2xl font-bold text-bronze">و</p>
            <h1 className="font-display text-[2.45rem] font-bold leading-[1.5] text-ink">
              {invitation.groom}
            </h1>
            <ShamsiDate className="mt-4 text-2xl text-ink" />
            <FloralDivider className="my-6 text-gold" />
            <div className="grid gap-2">
              <Button
                type="button"
                variant="gold"
                className="w-full"
                onClick={() => scrollToId("details")}
              >
                مشاهده اطلاعات مراسم
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => scrollToId("letter")}
              >
                متن دعوت
              </Button>
            </div>
          </div>

          <section id="letter" className="scroll-mt-20 px-6 py-10 text-center">
            <Heart className="mx-auto mb-4 size-5 text-bronze" strokeWidth={1.4} />
            <p
              className="font-display text-[1.35rem] font-normal leading-[2.45] text-ink"
              dir="rtl"
              lang="ar"
            >
              {invitation.letter}
            </p>
          </section>

          <div className="px-6">
            <img
              src="/images/roses.jpg"
              alt="گل‌های سفید روی کاغذ کرم"
              className="aspect-[3/2] w-full rounded-[var(--radius-xl)] object-cover"
            />
          </div>

          <section id="details" className="scroll-mt-20 px-6 py-10 text-center">
            <p className="mb-2 font-body text-xs tracking-[0.3em] text-bronze">
              {invitation.detailsTitle}
            </p>
            <p className="font-display text-xl leading-9 text-ink">
              {invitation.story}
            </p>
            <FloralDivider className="my-4 text-bronze" />

            <div className="mt-8 grid gap-2">
              <DetailRow
                icon={<Calendar className="size-5" strokeWidth={1.5} />}
                label="تاریخ مراسم"
                value={dateFull}
                href="#countdown"
              />
              <DetailRow
                icon={<Clock className="size-5" strokeWidth={1.5} />}
                label="زمان‌بندی مراسم"
                value={invitation.timeLead}
                href="#schedule"
              />
              <DetailRow
                icon={<MapPin className="size-5" strokeWidth={1.5} />}
                label="محل مراسم"
                value={invitation.venueName}
                href="#location"
              />
            </div>
          </section>

          <section className="px-6 pb-6">
            <div className="overflow-hidden rounded-[var(--radius-xl)] border-2 border-gold">
              <img
                src="/images/table.jpg"
                alt="میز شام جشن در عمارت"
                className="aspect-video w-full object-cover"
              />
            </div>
          </section>

          <section
            id="schedule"
            className="scroll-mt-20 px-6 py-8"
            aria-labelledby="timeline-title"
          >
            <div className="text-center">
              <h2 id="timeline-title" className="font-display text-2xl text-ink">
                {invitation.timelineTitle}
              </h2>
              <p className="mt-2 font-body text-sm leading-7 text-ink-soft">
                {invitation.timelineLead}
              </p>
            </div>
            <ol className="mt-8">
              {invitation.schedule.map((item, index) => {
                const Icon = scheduleIcons[item.time];
                const last = index === invitation.schedule.length - 1;
                return (
                  <li key={item.time} className="flex gap-4">
                    <div className="flex w-10 shrink-0 flex-col items-center">
                      <span className="grid size-10 place-items-center rounded-full border-2 border-gold bg-ivory text-gold">
                        <Icon className="size-4" strokeWidth={1.6} />
                      </span>
                      {!last ? (
                        <span className="my-1 w-px flex-1 bg-gold/45" />
                      ) : null}
                    </div>
                    <div className={last ? "pt-1.5" : "pb-7 pt-1.5"}>
                      <p className="font-display text-lg leading-7 text-ink">
                        {item.time}
                      </p>
                      <p className="font-body text-sm leading-6 text-ink-soft">
                        {item.title}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          <Countdown />
          <Rsvp onAfterSave={() => scrollToId("location")} />
          <Location />

          <footer className="px-6 pb-12 pt-4 text-center">
            <p className="font-body text-sm text-ink-soft">
              با عشق، منتظر دیدارتان
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(href.slice(1));
      }}
      className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-gold/70 bg-ivory-deep/50 px-4 py-3 text-start transition-colors duration-[var(--motion-quick)] hover:border-gold hover:bg-gold/10"
    >
      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/25 text-gold">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-body text-xs text-ink-soft">{label}</p>
        <div dir="rtl" className="font-body text-sm text-ink">
          {value}
        </div>
      </div>
      <ChevronLeft className="size-4 shrink-0 text-bronze" strokeWidth={1.6} />
    </a>
  );
}