import { useEffect, useId, useRef, useState } from "react";
import { FEATURED_VIDEO, HISTORY_VIDEOS } from "../data/videos";

const HISTORY_SOURCES = HISTORY_VIDEOS.map((item) => item.src);

function PlayIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-white`} aria-hidden="true">
      <path d="M8.4 5.8v12.4L18.2 12 8.4 5.8Z" />
    </svg>
  );
}

function VideoModal({ src, portrait, onClose }: { src: string; portrait?: boolean; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    const previous = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflowY = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-ink/60" aria-label="Fechar vídeo" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 overflow-hidden rounded-t-3xl bg-ink shadow-card sm:rounded-3xl ${portrait ? "w-full max-w-sm" : "w-full max-w-4xl"}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h2 id={titleId} className="font-serif text-xl text-white">
            Vídeo
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <video
          src={src}
          className={`w-full bg-black ${portrait ? "aspect-[9/16] max-h-[80vh] object-contain" : "aspect-video"}`}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}

const GRID_VIDEOS = HISTORY_SOURCES.slice(0, 10);

export function VideoGallery() {
  const [active, setActive] = useState<{ src: string; portrait?: boolean } | null>(null);

  return (
    <div>
      <h2 className="font-serif text-3xl text-[#6E121C] sm:text-4xl">Vídeos</h2>
      <p className="mt-0.5 font-serif text-lg text-[#6E121C]">Um pouco de História</p>
      <div className="mt-4 grid items-start gap-3 lg:grid-cols-[auto_minmax(0,1fr)]">
        <button
          type="button"
          onClick={() => setActive({ src: FEATURED_VIDEO, portrait: true })}
          className="relative mx-auto aspect-[9/16] h-[29.94rem] w-auto overflow-hidden rounded-2xl bg-ink lg:mx-0 lg:h-[36.59rem]"
        >
          <video src={FEATURED_VIDEO} className="h-full w-full object-cover" muted playsInline preload="metadata" />
          <span className="absolute inset-0 grid place-items-center bg-ink/20">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/80 bg-black/35">
              <PlayIcon className="h-4 w-4" />
            </span>
          </span>
        </button>

        <div className="grid h-[12rem] grid-cols-5 grid-rows-2 gap-2 lg:h-[36.59rem]">
          {GRID_VIDEOS.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActive({ src })}
              className="relative overflow-hidden rounded-xl bg-ink"
            >
              <video src={src} muted playsInline preload="metadata" className="h-full w-full object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-ink/20">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/80 bg-black/35">
                  <PlayIcon className="h-4 w-4" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {active ? <VideoModal src={active.src} portrait={active.portrait} onClose={() => setActive(null)} /> : null}
    </div>
  );
}
