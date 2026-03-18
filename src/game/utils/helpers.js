export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const formatTime = (seconds) => {
  const safe = Math.max(0, Math.ceil(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
