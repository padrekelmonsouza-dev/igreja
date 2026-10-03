import { motion, useReducedMotion } from "motion/react";
import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

export type HoverExpandOrientation = "horizontal" | "vertical";

export interface HoverExpandItem {
  alt?: string;
  description?: string;
  id: string;
  image?: string;
  title: string;
  kicker?: string;
}

export interface HoverExpandProps {
  activeIndex?: number;
  className?: string;
  collapsedFlex?: number;
  expandedFlex?: number;
  items: HoverExpandItem[];
  onActiveIndexChange?: (index: number) => void;
  /** Chamado ao clicar num painel que já está aberto. */
  onOpenItem?: (item: HoverExpandItem) => void;
  orientation?: HoverExpandOrientation;
  showLabelsWhenCollapsed?: boolean;
}

const DEFAULT_EXPANDED_FLEX = 4;
const DEFAULT_COLLAPSED_FLEX = 1;

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const HoverExpand = ({
  items,
  orientation = "horizontal",
  activeIndex: activeIndexProp,
  onActiveIndexChange,
  onOpenItem,
  expandedFlex = DEFAULT_EXPANDED_FLEX,
  collapsedFlex = DEFAULT_COLLAPSED_FLEX,
  showLabelsWhenCollapsed = true,
  className,
}: HoverExpandProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [internalActive, setInternalActive] = useState(0);
  const isControlled = activeIndexProp !== undefined;
  const activeIndex = isControlled ? activeIndexProp : internalActive;
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isHorizontal = orientation === "horizontal";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverDevice(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsHoverDevice(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setActive = (index: number) => {
    if (!isControlled) {
      setInternalActive(index);
    }
    onActiveIndexChange?.(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
    const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

    if (event.key === nextKey) {
      event.preventDefault();
      const next = Math.min(index + 1, items.length - 1);
      setActive(next);
      panelRefs.current[next]?.focus();
    } else if (event.key === prevKey) {
      event.preventDefault();
      const prev = Math.max(index - 1, 0);
      setActive(prev);
      panelRefs.current[prev]?.focus();
    }
  };

  const transition = shouldReduceMotion ? { duration: 0 } : { bounce: 0.1, duration: 0.35, type: "spring" as const };

  return (
    <div
      aria-label="Produtos em destaque"
      className={cn("flex w-full gap-2", isHorizontal ? "h-[360px] flex-row" : "h-[520px] flex-col", className)}
      role="group"
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const shouldShowLabel = isActive || showLabelsWhenCollapsed;

        return (
          <motion.button
            animate={{ flexGrow: isActive ? expandedFlex : collapsedFlex }}
            aria-label={item.title}
            aria-pressed={isActive}
            className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[1.5rem] bg-parchment text-left shadow-card ring-1 ring-burgundy/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            initial={false}
            key={item.id}
            onClick={() => {
              if (isActive) onOpenItem?.(item);
              else setActive(index);
            }}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onMouseEnter={() => {
              if (isHoverDevice) {
                setActive(index);
              }
            }}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            style={{ flexBasis: 0 }}
            transition={transition}
            type="button"
          >
            {item.image ? (
              <img
                alt={item.alt ?? item.title}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
                src={item.image}
              />
            ) : null}
            <motion.div
              aria-hidden="true"
              animate={{ opacity: isActive ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
              transition={transition}
            />
            {isHorizontal ? (
              <motion.div
                aria-hidden="true"
                animate={{ opacity: isActive ? 0 : 1 }}
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between bg-[linear-gradient(90deg,rgba(26,14,12,.92),rgba(110,18,28,.82)_45%,rgba(26,14,12,.92))] py-5"
                transition={transition}
              >
                <span className="flex w-full flex-col gap-1 px-3">
                  <span className="h-px bg-gold/80" />
                  <span className="h-px bg-gold/40" />
                </span>
                <span className="flex min-h-0 flex-1 items-center justify-center py-4">
                  <span className="rotate-180 whitespace-nowrap font-serif text-lg tracking-[0.08em] text-gold-soft [writing-mode:vertical-rl] sm:text-xl">
                    {item.title}
                  </span>
                </span>
                <span className="text-sm text-gold">✦</span>
                <span className="mt-2 flex w-full flex-col gap-1 px-3">
                  <span className="h-px bg-gold/40" />
                  <span className="h-px bg-gold/80" />
                </span>
              </motion.div>
            ) : null}
            <motion.div
              animate={{ opacity: isActive || (!isHorizontal && shouldShowLabel) ? 1 : 0 }}
              className="absolute inset-0 flex items-end p-4"
              transition={transition}
            >
              <div>
                {isActive && item.kicker ? (
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{item.kicker}</p>
                ) : null}
                <p className={cn("font-serif text-white", isActive ? "text-2xl leading-tight" : "text-lg")}>{item.title}</p>
                {isActive && item.description ? <p className="mt-1 text-xs text-white/80">{item.description}</p> : null}
                {isActive && onOpenItem ? (
                  <span className="mt-3 inline-block rounded-full bg-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-burgundy">
                    Ver detalhes
                  </span>
                ) : null}
              </div>
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default HoverExpand;
