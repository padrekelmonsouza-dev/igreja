export const FEATURED_VIDEO = "/videos/destaque.mp4";

export const HISTORY_VIDEOS = Array.from({ length: 24 }, (_, index) => ({
  src: `/videos/historia-${String(index + 1).padStart(2, "0")}.mp4`,
}));
