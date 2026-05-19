import { ViewIframeScript } from "./view-iframe-script";

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        html { scrollbar-width: none; }
        html::-webkit-scrollbar { display: none; }
      `}</style>
      <ViewIframeScript />
      {children}
    </>
  );
}
