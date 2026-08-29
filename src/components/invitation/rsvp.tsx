import { useEffect, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  invitation,
  rsvpOptions,
  type RsvpStatus,
} from "@/lib/invitation-data";
import { toFaDigits } from "@/lib/persian";
import { cn } from "@/lib/utils";
import { FloralDivider } from "./ornaments";

const STORAGE_KEY = "esra-mohammadsadegh-rsvp";
const NOTE_MAX = 500;

type Saved = {
  status: RsvpStatus;
  note: string;
  at: string;
};

async function sendRsvpEmail(payload: Saved) {
  const to = invitation.rsvpEmail.trim();
  if (!to) throw new Error("no-email");
  const label =
    rsvpOptions.find((o) => o.id === payload.status)?.label ?? payload.status;
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "پاسخ دعوت‌نامه اسراء و محمدصادق",
        _template: "table",
        _captcha: "false",
        "نام مراسم": invitation.title,
        وضعیت: label,
        یادداشت: payload.note || "—",
        زمان: new Date(payload.at).toLocaleString("fa-IR", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      }),
    },
  );
  if (!res.ok) throw new Error("send-failed");
  const data = (await res.json()) as { success?: boolean | string };
  if (data.success === false) throw new Error("send-failed");
}

export function Rsvp({ onAfterSave }: { onAfterSave: () => void }) {
  const [status, setStatus] = useState<RsvpStatus | null>(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState<Saved | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Saved;
      if (parsed.status) {
        setStatus(parsed.status);
        setNote(parsed.note ?? "");
        setSaved(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!status || sending) return;
    const next: Saved = {
      status,
      note: note.trim().slice(0, NOTE_MAX),
      at: new Date().toISOString(),
    };
    setSending(true);
    setError(null);
    try {
      await sendRsvpEmail(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(next);
      setJustSaved(true);
    } catch {
      setError(
        "ارسال به ایمیل انجام نشد. اتصال اینترنت را بررسی کنید و دوباره بزنید.",
      );
    } finally {
      setSending(false);
    }
  }

  const selectedLabel = rsvpOptions.find((o) => o.id === saved?.status)?.label;

  return (
    <section id="rsvp" className="scroll-mt-20 px-6 py-10" aria-labelledby="rsvp-title">
      <div className="text-center">
        <p className="mb-2 font-body text-xs tracking-[0.3em] text-bronze">
          پاسخ شما
        </p>
        <h2 id="rsvp-title" className="font-display text-2xl text-ink">
          {invitation.rsvpTitle}
        </h2>
        <FloralDivider className="my-4 text-bronze" />
        <p className="font-body text-sm leading-7 text-ink-soft">
          {invitation.rsvpLead}
        </p>
      </div>

      {saved && justSaved ? (
        <div className="mt-8 rounded-[var(--radius-xl)] border border-ink/10 bg-ivory-deep/70 px-5 py-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-gold/20 text-bronze">
            <Check className="size-6" strokeWidth={1.6} />
          </div>
          <p className="font-display text-xl text-ink">پاسخ شما ثبت شد</p>
          <p className="mt-2 font-body text-sm text-ink-soft">{selectedLabel}</p>
          <Button
            type="button"
            variant="gold"
            className="mt-6 w-full"
            onClick={onAfterSave}
          >
            مشاهده لوکیشن مراسم
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-5">
          <fieldset>
            <legend className="mb-3 font-body text-sm text-ink">
              وضعیت حضور
            </legend>
            <div className="grid gap-2">
              {rsvpOptions.map((opt) => {
                const active = status === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-[var(--radius-lg)] border px-4 py-3.5 transition-[border-color,background-color] duration-[var(--motion-quick)]",
                      active
                        ? "border-gold bg-gold/15"
                        : "border-ink/10 bg-ivory-deep/40 hover:border-ink/20",
                    )}
                  >
                    <span>
                      <span className="block font-body text-sm text-ink">
                        {opt.label}
                      </span>
                      <span className="block font-body text-xs text-ink-soft">
                        {opt.hint}
                      </span>
                    </span>
                    <input
                      type="radio"
                      name="rsvp"
                      value={opt.id}
                      checked={active}
                      onChange={() => setStatus(opt.id)}
                      className="size-4 accent-[var(--color-bronze)]"
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="rsvp-note" className="mb-2 block font-body text-sm text-ink">
              یادداشت اختیاری
            </label>
            <textarea
              id="rsvp-note"
              value={note}
              maxLength={NOTE_MAX}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="چند کلمه برای عروس و داماد…"
              className="w-full resize-none rounded-[var(--radius-lg)] border border-ink/12 bg-ivory px-4 py-3 font-body text-sm leading-6 text-ink placeholder:text-ink-soft/70 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
            <p className="mt-1 text-left font-body text-[11px] text-ink-soft" dir="ltr">
              {toFaDigits(note.length)} از {toFaDigits(NOTE_MAX)}
            </p>
          </div>

          <p className="font-body text-xs leading-6 text-ink-soft">
            {invitation.rsvpHint}
          </p>

          {error ? (
            <p className="font-body text-sm leading-6 text-wine">{error}</p>
          ) : null}

          <Button type="submit" variant="gold" className="w-full" disabled={!status || sending}>
            {sending
              ? "در حال ارسال…"
              : saved
                ? "به‌روزرسانی پاسخ"
                : "ثبت پاسخ"}
          </Button>
        </form>
      )}
    </section>
  );
}
