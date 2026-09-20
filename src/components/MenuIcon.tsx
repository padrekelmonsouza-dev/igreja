type MenuIconName =
  | "home"
  | "church"
  | "clergy"
  | "liturgy"
  | "catechesis"
  | "mission"
  | "bishop"
  | "monastery"
  | "parish"
  | "pastoral"
  | "joseph"
  | "door"
  | "heart";

const paths: Record<MenuIconName, string> = {
  home: "M4.6 10.8 12 4.6l7.4 6.2V19a1.4 1.4 0 0 1-1.4 1.4h-4.2v-5.2H9.6V20.4H5.4A1.4 1.4 0 0 1 4 19v-8.2Z",
  church:
    "M12 3.2v2.2M10.4 5.4h3.2M12 7.6 5.6 11.2V20.6h12.8V11.2L12 7.6ZM10 20.6v-4.4h4v4.4M8.4 13.4h1.4M14.2 13.4h1.4",
  clergy:
    "M12 4.6a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM7.2 20.4c.4-3.2 2.5-5 4.8-5s4.4 1.8 4.8 5M12 3.2v1.2",
  liturgy:
    "M12 3.4v3.2M9.8 4.6h4.4M8.6 20.6h6.8s0-2.2-.6-4.6c-.5-2.1-1.6-4.2-2.8-5.2h0c-1.2 1-2.3 3.1-2.8 5.2-.6 2.4-.6 4.6-.6 4.6Z",
  catechesis:
    "M12 6.2 5.4 8.6v9.2L12 15.4l6.6 2.4V8.6L12 6.2Zm0 0v9.2",
  mission:
    "M12 4.2a7.8 7.8 0 1 1 0 15.6 7.8 7.8 0 0 1 0-15.6ZM4.8 12h14.4M12 4.2c2 2.6 3 5.2 3 7.8s-1 5.2-3 7.8c-2-2.6-3-5.2-3-7.8s1-5.2 3-7.8Z",
  bishop:
    "M12 3.2 16.4 9.2H7.6L12 3.2Zm-4.4 6v3.6c0 2.4 1.6 4.4 4.4 5.4 2.8-1 4.4-3 4.4-5.4V9.2M12 18.2v2.6M9.4 20.8h5.2",
  monastery:
    "M5.2 20.6V11L12 5.6l6.8 5.4v9.6H5.2ZM9.6 20.6v-4.6h4.8v4.6M12 3.2v2.2M10.6 11.8h2.8",
  parish:
    "M12 20.6s6.4-4.8 6.4-9.4a6.4 6.4 0 1 0-12.8 0c0 4.6 6.4 9.4 6.4 9.4Zm0-7.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z",
  pastoral:
    "M12 19.8s-6.4-4-6.4-8.2A3.2 3.2 0 0 1 12 8.6a3.2 3.2 0 0 1 6.4 3c0 4.2-6.4 8.2-6.4 8.2Z",
  joseph:
    "M12 20.6V11.4M12 11.4c-2.2-2.4-5.6-3.4-7.2-1.6-1.4 1.6.2 3.4 2.2 3.1 1.6-.2 3.4-1.4 5-2.8Zm0 0c2.2-2.4 5.6-3.4 7.2-1.6 1.4 1.6-.2 3.4-2.2 3.1-1.6-.2-3.4-1.4-5-2.8ZM12 4.4a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Z",
  door: "M8 20.6V8.4A4 4 0 0 1 12 4.4a4 4 0 0 1 4 4v12.2H8Zm5.2-8.4h.01",
  heart:
    "M12 19.6s-6.6-4.2-6.6-8.6A3.3 3.3 0 0 1 12 8a3.3 3.3 0 0 1 6.6 3c0 4.4-6.6 8.6-6.6 8.6Z",
};

export function MenuIcon({
  name,
  className = "h-4 w-4",
}: {
  name?: string;
  className?: string;
}) {
  const d = name && name in paths ? paths[name as MenuIconName] : paths.church;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
