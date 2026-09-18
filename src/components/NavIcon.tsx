import type { ReactNode } from "react";

export type NavIconName =
  | "home"
  | "cross"
  | "scales"
  | "door"
  | "book"
  | "question"
  | "glossary"
  | "church"
  | "monastery"
  | "parish"
  | "synod"
  | "liturgy"
  | "catechesis"
  | "clergy"
  | "bishop"
  | "pastoral"
  | "joseph"
  | "mission"
  | "prayer"
  | "search"
  | "calendar"
  | "saints"
  | "news"
  | "video"
  | "library";

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

const ICONS: Record<NavIconName, (className?: string) => ReactNode> = {
  home: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M12 3.1 3.4 10.2a.9.9 0 0 0-.3.7V20a1.2 1.2 0 0 0 1.2 1.2h5.3v-6.1h4.8V21.2h5.3A1.2 1.2 0 0 0 21 20v-9.1a.9.9 0 0 0-.3-.7L12 3.1Z" />
      <path fill="white" fillOpacity=".42" d="M11.25 9.1h1.5v2.1h2.1v1.5h-2.1v2.2h-1.5v-2.2H9.15v-1.5h2.1V9.1Z" />
    </Svg>
  ),
  cross: (className) => (
    <Svg className={className}>
      <path
        fill="currentColor"
        d="M11.15 2.2h1.7v1.8h2.55v1.45h-2.55v1.7h3.7v1.55h-3.7v7.55l3.05 1.15-.5 1.4-2.55-1V21.8h-1.7v-4.85l-2.55 1 .5-1.4 3.05-1.15V8.7H7.45V7.15h3.7V5.45H8.6V4h2.55V2.2Z"
      />
    </Svg>
  ),
  scales: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M11.25 3.2h1.5v13.3h3.4v1.5h-8.3v-1.5h3.4V3.2Z" />
      <path fill="currentColor" d="M12 5.4 6.1 13.2H3.7l5.2-8.2 3.1.4Zm0 0 5.9 7.8h2.4l-5.2-8.2-3.1.4Z" opacity=".9" />
      <path fill="currentColor" d="M4.2 13.6h5.2l-2.6 4.2-2.6-4.2Zm10.4 0h5.2l-2.6 4.2-2.6-4.2Z" />
    </Svg>
  ),
  door: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M7 21.2V8.1c0-2.7 2.2-5.1 5-5.1s5 2.4 5 5.1v13.1H7Z" />
      <path fill="white" fillOpacity=".42" d="M8.5 21.2V8.3c0-1.9 1.6-3.6 3.5-3.6s3.5 1.7 3.5 3.6v12.9H8.5Z" />
      <circle cx="13.35" cy="12.4" r=".85" fill="currentColor" />
    </Svg>
  ),
  book: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M5.2 4.3A2.4 2.4 0 0 1 7.6 2.8H19.2v16.3H7.7a2.2 2.2 0 0 0-2.5 2.1V4.3Z" />
      <path fill="white" fillOpacity=".42" d="M7.5 4.3h10.2v13.4H7.7c-.4 0-.8.05-1.2.16V5.6A1.3 1.3 0 0 1 7.5 4.3Z" />
      <path fill="currentColor" d="M8.7 7.1h7.1v1.3H8.7zm0 3h7.1v1.3H8.7zm0 3h4.8v1.3H8.7z" />
    </Svg>
  ),
  question: (className) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9.2" fill="currentColor" />
      <path
        fill="white" fillOpacity=".42"
        d="M12.1 16.85a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Zm-.05-9.7c1.95 0 3.45 1.28 3.45 3.12 0 1.42-.78 2.18-1.86 2.78-.84.48-1.14.82-1.14 1.5v.55h-1.55v-.7c0-1.22.62-1.88 1.72-2.48.86-.48 1.22-.86 1.22-1.58 0-.78-.64-1.32-1.78-1.32-1.12 0-1.86.52-2.04 1.42H8.6c.22-1.82 1.72-3.29 3.45-3.29Z"
      />
    </Svg>
  ),
  glossary: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M5.4 3.2h11.4A1.8 1.8 0 0 1 18.6 5v14.2a1.8 1.8 0 0 1-1.8 1.8H5.4V3.2Z" />
      <path fill="white" fillOpacity=".42" d="M7 4.8h9.2v14.6H7V4.8Z" />
      <path fill="currentColor" d="M8.4 7h6.2v1.25H8.4zm0 3h6.2v1.25H8.4zm0 3h4.2v1.25H8.4z" />
      <path fill="currentColor" d="M16.8 3.2 20 5.4v12.4l-3.2 2.2V3.2Z" />
    </Svg>
  ),
  church: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M11.25 2h1.5v2.2h1.7v1.4h-1.7v1.6L19 10.4V21.2H5V10.4l6.25-3.2V5.6h-1.7V4.2h1.7V2Z" />
      <path fill="white" fillOpacity=".42" d="M9.2 21.2v-5.3h5.6v5.3H9.2Z" />
      <path fill="currentColor" d="M11.25 12.1h1.5v2.1h2.05v1.4h-2.05v2.1h-1.5v-2.1H9.2v-1.4h2.05v-2.1Z" opacity=".95" />
    </Svg>
  ),
  monastery: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M4.2 21.2V10.4L12 4.6l7.8 5.8v10.8H4.2Z" />
      <path fill="white" fillOpacity=".42" d="M9.4 21.2v-5.1h5.2v5.1H9.4Z" />
      <path fill="currentColor" d="M11.25 2.2h1.5v2.4h-1.5zM10.4 11.4h3.2v1.4h-3.2z" />
    </Svg>
  ),
  parish: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M12 21.4s7.2-5.6 7.2-11.1A7.2 7.2 0 0 0 4.8 10.3C4.8 15.8 12 21.4 12 21.4Z" />
      <circle cx="12" cy="10.2" r="2.35" fill="white" fillOpacity=".42" />
    </Svg>
  ),
  synod: (className) => (
    <Svg className={className}>
      <circle cx="12" cy="6.3" r="2.4" fill="currentColor" />
      <circle cx="6.1" cy="9.4" r="2" fill="currentColor" />
      <circle cx="17.9" cy="9.4" r="2" fill="currentColor" />
      <path fill="currentColor" d="M7.6 20.8c.2-3.3 2.4-5.3 4.4-5.3s4.2 2 4.4 5.3H7.6ZM2.8 20.8c.3-2.4 1.8-3.9 3.4-4.2-.7 1.2-1.1 2.6-1.2 4.2H2.8Zm18.4 0h-2.2c-.1-1.6-.5-3-1.2-4.2 1.6.3 3.1 1.8 3.4 4.2Z" />
    </Svg>
  ),
  liturgy: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M8.2 21.2h7.6v-1.5c0-3.5-.9-6.4-2.3-8.6h-3c-1.4 2.2-2.3 5.1-2.3 8.6v1.5Z" />
      <path fill="currentColor" d="M11.2 4.1h1.6v3.4h-1.6z" />
      <path fill="currentColor" d="M9.4 5.2h5.2v1.35H9.4z" />
      <circle cx="12" cy="3.3" r="1.05" fill="currentColor" />
    </Svg>
  ),
  catechesis: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M4.2 19.4V6.6L12 3.6l7.8 3v12.8L12 16.6 4.2 19.4Z" />
      <path fill="white" fillOpacity=".42" d="M12 5.5v9.8l6.2 2.2V7.6L12 5.5Z" opacity=".9" />
    </Svg>
  ),
  clergy: (className) => (
    <Svg className={className}>
      <circle cx="12" cy="7.2" r="3.3" fill="currentColor" />
      <path fill="currentColor" d="M5.3 21.2c.5-3.8 3.2-6.1 6.7-6.1s6.2 2.3 6.7 6.1H5.3Z" />
      <path fill="white" fillOpacity=".42" d="M11.25 2.4h1.5v2.2h-1.5z" />
    </Svg>
  ),
  bishop: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M12 2.4 16.6 9H7.4L12 2.4Z" />
      <path fill="currentColor" d="M7.5 9h9v4.1c0 2.6-1.7 4.8-4.5 5.8-2.8-1-4.5-3.2-4.5-5.8V9Z" />
      <path fill="currentColor" d="M11.25 18.8h1.5V21.6h-1.5zM9.2 21.6h5.6v1.2H9.2z" />
    </Svg>
  ),
  pastoral: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M12 20.8S4.8 16.3 4.8 11.2A3.7 3.7 0 0 1 12 8.6a3.7 3.7 0 0 1 7.2 2.6c0 5.1-7.2 9.6-7.2 9.6Z" />
      <path fill="white" fillOpacity=".42" d="M11.3 10.4h1.4v2h1.9v1.35h-1.9v2.05h-1.4v-2.05H9.4V12.4h1.9v-2z" />
    </Svg>
  ),
  joseph: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M11.2 21.2V11.4c-2.5-1.4-5.8-1.6-7-0.1-1.1 1.5.1 3.2 2 2.9 1.5-.3 3.4-1.4 5-2.8Z" />
      <path fill="currentColor" d="M12.8 21.2V11.4c2.5-1.4 5.8-1.6 7-.1 1.1 1.5-.1 3.2-2 2.9-1.5-.3-3.4-1.4-5-2.8Z" />
      <circle cx="12" cy="6.4" r="2.4" fill="currentColor" />
    </Svg>
  ),
  mission: (className) => (
    <Svg className={className}>
      <circle cx="12" cy="12" r="9.1" fill="currentColor" />
      <path
        fill="white" fillOpacity=".42"
        d="M12 4.4c1.9 2.5 2.8 5.1 2.8 7.6S13.9 17.1 12 19.6c-1.9-2.5-2.8-5.1-2.8-7.6S10.1 6.9 12 4.4Z"
        opacity=".95"
      />
      <path fill="white" fillOpacity=".42" d="M4.6 11.25h14.8v1.5H4.6z" />
    </Svg>
  ),
  prayer: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M10.3 21.2V10.6A2.4 2.4 0 0 0 7.9 8.2H6.2v5.4A3.6 3.6 0 0 0 9.8 17.2h.5v4Z" />
      <path fill="currentColor" d="M13.7 21.2V10.6A2.4 2.4 0 0 1 16.1 8.2h1.7v5.4A3.6 3.6 0 0 1 14.2 17.2h-.5v4Z" />
      <path fill="currentColor" d="M11.25 3.3h1.5v2.6h-1.5zM9.7 4.4h4.6v1.3H9.7z" />
    </Svg>
  ),
  search: (className) => (
    <Svg className={className}>
      <circle cx="10.6" cy="10.6" r="6.3" fill="currentColor" />
      <circle cx="10.6" cy="10.6" r="3.7" fill="white" fillOpacity=".42" />
      <path fill="currentColor" d="m14.7 14.7 5.1 5.1-1.4 1.4-5.1-5.1z" />
    </Svg>
  ),
  calendar: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M5.2 4.8h13.6A1.8 1.8 0 0 1 20.6 6.6V19a1.8 1.8 0 0 1-1.8 1.8H5.2A1.8 1.8 0 0 1 3.4 19V6.6A1.8 1.8 0 0 1 5.2 4.8Z" />
      <path fill="white" fillOpacity=".42" d="M4.9 9.2h14.2v9.9H4.9z" />
      <path fill="currentColor" d="M7.4 3.3h1.6v3.2H7.4zm7.6 0h1.6v3.2h-1.6zM7.2 11.2h2v2h-2zm3.8 0h2v2h-2zm3.8 0h2v2h-2z" />
    </Svg>
  ),
  saints: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M12 2.4 13.3 6h3.8l-3 2.3 1.1 3.7L12 10.1 8.8 12l1.1-3.7-3-2.3h3.8L12 2.4Z" />
      <circle cx="12" cy="16.6" r="4.6" fill="currentColor" />
      <path fill="white" fillOpacity=".42" d="M11.3 14.3h1.4v2.1h2v1.35h-2v2.1h-1.4v-2.1H9.3V16.4h2v-2.1Z" />
    </Svg>
  ),
  news: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M4.4 5.2h12.8A1.6 1.6 0 0 1 18.8 6.8V19a.8.8 0 0 1-.8.8H6A1.6 1.6 0 0 1 4.4 18.2V5.2Z" />
      <path fill="white" fillOpacity=".42" d="M6 6.7h9.6v4.4H6zm0 5.8h9.6v1.2H6zm0 2.3h6.4v1.2H6z" />
      <path fill="currentColor" d="M17.4 8.4h2.2A1.4 1.4 0 0 1 21 9.8v8.4a1.6 1.6 0 0 1-1.6 1.6h-2V8.4Z" />
    </Svg>
  ),
  video: (className) => (
    <Svg className={className}>
      <rect x="2.8" y="5.4" width="13.6" height="13.2" rx="2.2" fill="currentColor" />
      <path fill="currentColor" d="M16.4 9.6 21.2 7v10.1l-4.8-2.6V9.6Z" />
      <path fill="white" fillOpacity=".42" d="M7.4 9.2 13.2 12 7.4 14.8V9.2Z" />
    </Svg>
  ),
  library: (className) => (
    <Svg className={className}>
      <path fill="currentColor" d="M4.2 4.4h3.1v15.4H4.2zm4.4 1.6h3.1v13.8H8.6zm4.4-1.6h3.1v15.4h-3.1zm4.4 2.4h3.3v13H17.4z" />
    </Svg>
  ),
};

function isNavIconName(name: string): name is NavIconName {
  return name in ICONS;
}

export function NavIcon({
  name,
  className = "h-4 w-4",
}: {
  name: NavIconName | string;
  className?: string;
}) {
  const icon = isNavIconName(name) ? name : "cross";
  return ICONS[icon](className);
}

export function NavLabel({
  icon,
  label,
  iconClassName = "h-4 w-4 shrink-0",
  className = "inline-flex min-w-0 items-center gap-2",
  variant = "plain",
}: {
  icon: NavIconName | string;
  label: string;
  iconClassName?: string;
  className?: string;
  variant?: "plain" | "badge";
}) {
  return (
    <span className={className}>
      {variant === "badge" ? (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(160deg,#5a0d18,#8d2530)] text-gold-soft shadow-[inset_0_1px_0_rgba(255,255,255,.22)]">
          <NavIcon name={icon} className="h-5 w-5" />
        </span>
      ) : (
        <NavIcon name={icon} className={`${iconClassName} text-burgundy`} />
      )}
      <span>{label}</span>
    </span>
  );
}
