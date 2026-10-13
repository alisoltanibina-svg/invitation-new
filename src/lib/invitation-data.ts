export const invitation = {
  bride: "فاطمه",
  groom: "علی",
  monogram: "F/A",
  title: "جشن پیوند فاطمه و علی",
  coverKicker: "F / A",
  coverTitle: "با افتخار به جشن پیوند ما دعوتید",
  openLabel: "باز کنید",
  bismillah: "به نام خالق عشق",
  letterTitle: "جشن پیوند",
  letter:
    "فضولی‌نین بو مصرالارینداکی عشق کیمی، سئوگیمیز ده کؤنلوموزده چیچکلندی. ایندی بو سئوگی‌نی بیر عؤمورلوک یولا چئوییره‌جه‌ییمیز شنلیک گونوموزده سیزی ده یانیمیزدا گؤرمک ایسته‌ریک.",
  storyTitle: "گلیشینیز سئوینجیمیزه سئوینج قاتار",
  story: "گلیشینیز سئویـنـجیمیزه سئویـنـج قاتار.",
  detailsTitle: "جزئیات مراسم",
  timelineTitle: "یک غروب، یک آغاز",
  timelineLead: "پنجشنبه، سی‌ام مهر ۱۴۰۵",
  countdownTitle: "تا لحظه دیدار شما",
  countdownPast: "این غروب به زیبایی در خاطره‌ها ماند",
  rsvpTitle: "پاسخ به دعوت",
  rsvpLead:
    "حضور شما، بهترین هدیه‌ی این شب خواهد بود. شما را صمیمانه دعوت می‌کنیم تا در جشن آغاز زندگی مشترکمان، همراه و شادی‌بخش این شب خاطره‌انگیز باشید.",
  rsvpHint: "لطفاً در صورت امکان پاسخ خود را پیش از مراسم ثبت کنید.",
  rsvpEmail: "sadegh.sd.1172@gmail.com",
  locationTitle: "نشانی مراسم",
  locationKicker: "محل میعاد ما",
  venueName: "تالار رویال",
  venueAddress: "تبریز، خاوران، تالار رویال",
  jalali: {
    year: 1405,
    month: 7,
    day: 30,
    weekday: "پنجشنبه",
    monthName: "مهر",
    dayName: "سی‌ام",
  },
  timeRange: "۱۶:۰۰ — ۱۹:۰۰",
  timeLead: "ساعت ۱۶:۰۰ الی ۱۹:۰۰",
  // 30 Mehr 1405 = 22 Oct 2026, 16:00–19:00 Asia/Tehran (UTC+3:30)
  startIso: "2026-10-22T12:30:00.000Z",
  endIso: "2026-10-22T15:30:00.000Z",
  schedule: [
    { time: "۱۶:۰۰", title: "پذیرایی و خوش‌آمدگویی" },
    { time: "۱۷:۰۰", title: "آغاز مراسم" },
    { time: "۱۸:۰۰", title: "صرف شام" },
    { time: "۱۹:۰۰", title: "بدرقه مهمانان" },
  ],
  mapsQuery: "باغ تالار رویال خاوران تبریز",
  neshanPlace:
    "https://neshan.org/maps/search/%D8%A8%D8%A7%D8%BA%20%D8%AA%D8%A7%D9%84%D8%A7%D8%B1%20%D8%B1%D9%88%DB%8C%D8%A7%D9%84%20%D8%AE%D8%A7%D9%88%D8%B1%D8%A7%D9%86%20%D8%AA%D8%A8%D8%B1%DB%8C%D8%B2",
} as const;

export const rsvpOptions = [
  { id: "yes", label: "حضور دارم", hint: "با شوق می‌آیم" },
  { id: "maybe", label: "هنوز مشخص نیست", hint: "به‌زودی خبر می‌دهم" },
  { id: "no", label: "نمی‌توانم بیایم", hint: "در دلم کنار شمایم" },
] as const;

export type RsvpStatus = (typeof rsvpOptions)[number]["id"];

export function mapsLinks(query: string) {
  const q = encodeURIComponent(query);
  return [
    {
      id: "neshan",
      label: "نشان",
      href: invitation.neshanPlace,
    },
    {
      id: "balad",
      label: "بلد",
      href: `https://balad.ir/search/?query=${q}`,
    },
    {
      id: "google",
      label: "گوگل‌مپ",
      href: `https://www.google.com/maps/search/?api=1&query=${q}`,
    },
    {
      id: "waze",
      label: "ویز",
      href: `https://waze.com/ul?q=${q}&navigate=yes`,
    },
  ] as const;
}

export function calendarUrls() {
  const text = encodeURIComponent(invitation.title);
  const details = encodeURIComponent(
    `${invitation.venueName} — ${invitation.venueAddress}`,
  );
  const location = encodeURIComponent(
    `${invitation.venueName}، ${invitation.venueAddress}`,
  );
  const dates = "20261022T160000/20261022T190000";
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&ctz=Asia/Tehran&details=${details}&location=${location}`,
  };
}

export function buildIcs(): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FatemehAli//Invitation//FA",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "DTSTAMP:20261001T000000Z",
    "DTSTART;TZID=Asia/Tehran:20261022T160000",
    "DTEND;TZID=Asia/Tehran:20261022T190000",
    `SUMMARY:${invitation.title}`,
    `LOCATION:${invitation.venueName}، ${invitation.venueAddress}`,
    `DESCRIPTION:${invitation.letter}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
