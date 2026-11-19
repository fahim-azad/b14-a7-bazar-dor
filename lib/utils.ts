// সাধারণ বাংলা সংখ্যা ও তারিখ রূপান্তর ফাংশন (Beginner-friendly utilities)

export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function getBanglaDate(): string {
  const date = new Date();
  
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const dayName = days[date.getDay()];
  const day = toBengaliNumber(date.getDate());
  const monthName = months[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());

  return `${dayName}, ${day} ${monthName}, ${year}`;
}

export function formatUnit(unit?: string, prefix = false): string {
  if (!unit) return prefix ? "প্রতি কেজি" : "/কেজি";
  const map: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  const bn = map[unit.toLowerCase()] || unit;
  return prefix ? `প্রতি ${bn}` : `/${bn}`;
}

