const paper = "#fff8f0";
const ink = "#6f1d1b";
const accent = "#c63d2f";
const soft = "#d9b8a4";

const toUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const wrap = (width, height, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;

export const assetMap = {
  bg: toUri(
    wrap(
      640,
      360,
      `
      <rect width="640" height="360" fill="${paper}"/>
      <path d="M0 280 C80 250 120 250 180 280 S300 315 360 290 480 225 640 275" fill="none" stroke="${soft}" stroke-width="4" stroke-linecap="round"/>
      <path d="M20 215 C80 180 120 185 180 220 S315 260 410 215 520 165 640 215" fill="none" stroke="${soft}" stroke-width="3" stroke-linecap="round"/>
      <path d="M500 80 C530 30 540 30 560 80" fill="none" stroke="${soft}" stroke-width="4" stroke-linecap="round"/>
      <path d="M560 80 C590 30 600 30 620 80" fill="none" stroke="${soft}" stroke-width="4" stroke-linecap="round"/>
      <path d="M45 65 C70 40 95 40 115 65" fill="none" stroke="${soft}" stroke-width="4" stroke-linecap="round"/>
      <path d="M115 65 C140 40 165 40 185 65" fill="none" stroke="${soft}" stroke-width="4" stroke-linecap="round"/>
    `
    )
  ),
  platform: toUri(
    wrap(
      128,
      48,
      `
      <rect x="4" y="6" width="120" height="34" rx="6" fill="${paper}" stroke="${ink}" stroke-width="4"/>
      <path d="M10 16 h108 M14 28 h100" stroke="${soft}" stroke-width="3" stroke-linecap="round"/>
      <path d="M8 40 C26 32 42 44 58 38 S94 33 120 40" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    `
    )
  ),
  playerIdle: toUri(
    wrap(
      48,
      64,
      `
      <ellipse cx="24" cy="55" rx="13" ry="4" fill="${soft}" opacity="0.45"/>
      <path d="M18 17 L14 5 L20 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 17 L34 5 L28 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="24" cy="22" r="12" fill="${paper}" stroke="${ink}" stroke-width="3"/>
      <path d="M17 39 C17 31 20 28 24 28 28 28 31 31 31 39 v12 h-14z" fill="${accent}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M21 22 h1 M27 22 h1" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 27 C23 29 25 29 26 27" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 53 l-4 6 M30 53 l4 6" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M17 41 l-5 5 M31 41 l5 5" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    `
    )
  ),
  playerRunA: toUri(
    wrap(
      48,
      64,
      `
      <ellipse cx="24" cy="55" rx="13" ry="4" fill="${soft}" opacity="0.45"/>
      <path d="M18 17 L14 5 L20 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 17 L34 5 L28 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="24" cy="22" r="12" fill="${paper}" stroke="${ink}" stroke-width="3"/>
      <path d="M17 39 C17 31 20 28 24 28 28 28 31 31 31 39 v12 h-14z" fill="${accent}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M21 22 h1 M27 22 h1" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 27 C23 29 25 29 26 27" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 53 l-8 4 M30 53 l8 1" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M17 41 l-7 2 M31 41 l4 7" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    `
    )
  ),
  playerRunB: toUri(
    wrap(
      48,
      64,
      `
      <ellipse cx="24" cy="55" rx="13" ry="4" fill="${soft}" opacity="0.45"/>
      <path d="M18 17 L14 5 L20 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 17 L34 5 L28 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="24" cy="22" r="12" fill="${paper}" stroke="${ink}" stroke-width="3"/>
      <path d="M17 39 C17 31 20 28 24 28 28 28 31 31 31 39 v12 h-14z" fill="${accent}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M21 22 h1 M27 22 h1" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 27 C23 29 25 29 26 27" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
      <path d="M18 53 l-6 0 M30 53 l4 6" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M17 41 l-5 7 M31 41 l7 2" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    `
    )
  ),
  playerJump: toUri(
    wrap(
      48,
      64,
      `
      <ellipse cx="24" cy="57" rx="10" ry="3" fill="${soft}" opacity="0.45"/>
      <path d="M18 17 L14 5 L20 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 17 L34 5 L28 3 L24 15" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="24" cy="22" r="12" fill="${paper}" stroke="${ink}" stroke-width="3"/>
      <path d="M17 39 C17 31 20 28 24 28 28 28 31 31 31 39 v12 h-14z" fill="${accent}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M21 22 h1 M27 22 h1" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M21 28 C23 26 25 26 27 28" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
      <path d="M19 52 l-6 -2 M29 52 l6 -2" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M17 40 l-7 -3 M31 40 l7 -3" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    `
    )
  ),
  collectible: toUri(
    wrap(
      36,
      36,
      `
      <circle cx="18" cy="18" r="12" fill="${paper}" stroke="${ink}" stroke-width="3"/>
      <path d="M18 7 v22 M7 18 h22" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="18" cy="18" r="4" fill="${accent}"/>
    `
    )
  ),
  spike: toUri(
    wrap(
      64,
      32,
      `
      <rect x="2" y="24" width="60" height="6" rx="2" fill="${soft}" stroke="${ink}" stroke-width="3"/>
      <path d="M8 24 L18 6 L28 24 M28 24 L38 6 L48 24 M48 24 L56 10 L60 24" fill="${paper}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
    `
    )
  ),
  goal: toUri(
    wrap(
      80,
      120,
      `
      <path d="M20 112 V10" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
      <path d="M23 12 C50 18 62 28 62 48 62 68 49 74 23 78" fill="${paper}" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="48" cy="46" r="10" fill="${accent}" opacity="0.65"/>
    `
    )
  )
};
