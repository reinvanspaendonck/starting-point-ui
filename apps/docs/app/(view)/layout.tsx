import { ViewIframeScript } from "./view-iframe-script";

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ViewIframeScript />
      {children}
    </>
  );
}
