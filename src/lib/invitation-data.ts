export const invitation = {
  bride: "اسراء",
  groom: "محمدصادق",
  monogram: "A/M",
  title: "جشن پیوند اسراء و محمدصادق",
  coverKicker: "A / M",
  coverTitle: "با افتخار به جشن پیوند ما دعوتید",
  openLabel: "باز کنید",
  bismillah: "به نام خالق عشق",
  letterTitle: "جشن پیوند",
  letter:
    "وَمِنْ آیَاتِهِ أَنْ خَلَقَ لَکُم مِّنْ أَنفُسِکُمْ أَزْوَاجًا لِّتَسْکُنُوا إِلَیْهَا وَجَعَلَ بَیْنَکُم مَّوَدَّةً وَرَحْمَةً إِنَّ فِی ذَلِکَ لَآیَاتٍ لِّقَوْمٍ یَتَفَکَّرُونَ.",
  storyTitle: "داستان عاشقانه‌ی ما، از این روز آغاز می‌شود",
  story:
    "آغاز زندگی مشترکمان را در سایه مهر الهی جشن می‌گیریم. حضور گرم شما، زیباترین هدیه برای آغاز این سفر طولانی و شیرین است.",
  detailsTitle: "جزئیات مراسم",
  timelineTitle: "یک غروب، یک آغاز",
  timelineLead: "دوشنبه، بیست‌وسوم شهریور ۱۴۰۵",
  countdownTitle: "تا لحظه دیدار شما",
  countdownPast: "این غروب به زیبایی در خاطره‌ها ماند",
  rsvpTitle: "پاسخ به دعوت",
  rsvpLead:
    "حضور شما، بهترین هدیه‌ی این شب خواهد بود. شما را صمیمانه دعوت می‌کنیم تا در جشن آغاز زندگی مشترکمان، همراه و شادی‌بخش این شب خاطره‌انگیز باشید.",
  rsvpHint: "لطفاً در صورت امکان پاسخ خود را پیش از مراسم ثبت کنید.",
  rsvpEmail: "sadegh.sd.1172@gmail.com",
  locationTitle: "نشانی مراسم",
  locationKicker: "محل میعاد ما",
  venueName: "عمارت شمس",
  venueAddress:
    "تهران، بزرگراه همت شرق به غرب، بلوار عدل شمالی، عمارت شمس",
  jalali: {
    year: 1405,
    month: 6,
    day: 23,
    weekday: "دوشنبه",
    monthName: "شهریور",
    dayName: "بیست‌وسوم",
  },
  timeRange: "۱۹:۰۰ — ۲۲:۰۰",
  timeLead: "ساعت ۱۹:۰۰ الی ۲۲:۰۰",
  // 23 Shahrivar 1405 = 14 Sep 2026, 19:00–22:00 Asia/Tehran (UTC+3:30)
  startIso: "2026-09-14T15:30:00.000Z",
  endIso: "2026-09-14T18:30:00.000Z",
  schedule: [
    { time: "۱۹:۰۰", title: "پذیرایی و خوش‌آمدگویی" },
    { time: "۲۰:۰۰", title: "آغاز مراسم" },
    { time: "۲۱:۰۰", title: "صرف شام" },
    { time: "۲۲:۰۰", title: "بدرقه مهمانان" },
  ],
  mapsQuery: "تالار پذیرایی عمارت شمس همت بلوار عدل تهران",
  neshanPlace: "https://neshan.org/maps/places/334dfd52e43bacaa25e3c576d1273bc0",
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
  const dates = "20260914T190000/20260914T220000";
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&ctz=Asia/Tehran&details=${details}&location=${location}`,
  };
}

export function buildIcs(): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//EsraMohammadsadegh//Invitation//FA",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "DTSTAMP:20260801T000000Z",
    "DTSTART;TZID=Asia/Tehran:20260914T190000",
    "DTEND;TZID=Asia/Tehran:20260914T220000",
    `SUMMARY:${invitation.title}`,
    `LOCATION:${invitation.venueName}، ${invitation.venueAddress}`,
    `DESCRIPTION:${invitation.letter}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
