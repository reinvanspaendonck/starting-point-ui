import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Set up two-factor authentication",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-10"
      >
        Enable 2FA
      </button>

      <dialog
        id="dialog-10"
        className="dialog"
        aria-labelledby="dialog-10-title"
        aria-describedby="dialog-10-description"
      >
        <div className="dialog-backdrop"></div>
        <div className="dialog-panel">
          <button
            type="button"
            className="btn btn-ghost btn-icon-xs absolute top-3 right-3"
            aria-label="Close"
            data-sp-dismiss="dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          <div className="dialog-content grid gap-6">
            <div>
              <h2
                id="dialog-10-title"
                className="text-lg font-semibold tracking-tight"
              >
                Enable two-factor authentication
              </h2>
              <p
                id="dialog-10-description"
                className="text-sm/6 text-muted-foreground mt-2"
              >
                Scan the QR code below with your authenticator app, or enter the
                provided setup key manually.
              </p>
            </div>

            <div className="flex aspect-3/2 items-center justify-center rounded-lg border bg-muted/50">
              <div className="relative rounded-lg bg-white p-2 dark:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" shapeRendering="crispEdges" className="size-32" role="img" aria-label="QR code"><path fill="#ffffff" d="M0 0h37v37H0z"/><path stroke="#000000" d="M4 4.5h7m8 0h6m1 0h7M4 5.5h1m5 0h1m3 0h1m7 0h1m1 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m2 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h3m5 0h2m1 0h1m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h3m1 0h4m1 0h4m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h1m1 0h5m4 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m2 0h3m1 0h1m2 0h1M4 12.5h1m1 0h5m2 0h3m2 0h2m1 0h1m2 0h1m1 0h5M5 13.5h2m1 0h1m2 0h1m1 0h1m5 0h2m2 0h2m1 0h3m3 0h1M4 14.5h1m1 0h2m1 0h3m2 0h2m8 0h2M5 15.5h1m2 0h2m1 0h4m3 0h1m1 0h1m1 0h3m1 0h2m1 0h1m1 0h1M4 16.5h1m2 0h6m1 0h1m1 0h1m3 0h2m7 0h2M4 17.5h3m1 0h1m2 0h1m1 0h1m3 0h3m3 0h2m1 0h1m1 0h1m3 0h1M7 18.5h2m1 0h1m1 0h2m1 0h6m6 0h1m1 0h2M5 19.5h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m3 0h3m1 0h2m2 0h1M5 20.5h1m1 0h1m2 0h1m3 0h2m2 0h2m1 0h1m1 0h1m3 0h1m1 0h2M4 21.5h1m1 0h2m1 0h1m5 0h1m3 0h10m1 0h1m1 0h1M4 22.5h1m1 0h1m3 0h1m1 0h5m5 0h1m1 0h2m1 0h1m2 0h1M4 23.5h1m2 0h1m10 0h1m1 0h1m6 0h2m2 0h1M4 24.5h1m1 0h1m3 0h1m2 0h3m5 0h8m1 0h3M12 25.5h4m1 0h3m1 0h2m1 0h1m3 0h5M4 26.5h7m2 0h1m1 0h7m1 0h2m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h4m1 0h1m1 0h2m1 0h3m3 0h1m3 0h1M4 28.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h1m2 0h1m2 0h5m1 0h1m1 0h1M4 29.5h1m1 0h3m1 0h1m1 0h1m4 0h1m2 0h1m1 0h1m4 0h1m1 0h2M4 30.5h1m1 0h3m1 0h1m1 0h4m1 0h1m1 0h5m2 0h6M4 31.5h1m5 0h1m4 0h2m1 0h1m1 0h1m2 0h3m1 0h1m1 0h1m1 0h1M4 32.5h7m1 0h1m1 0h4m3 0h1m1 0h1m1 0h6"/></svg>
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute top-0 left-0 size-3 rounded-tl border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute top-0 right-0 size-3 rounded-tr border-t-2 border-r-2 border-primary"></div>
                  <div className="absolute bottom-0 right-0 size-3 rounded-br border-b-2 border-r-2 border-primary"></div>
                  <div className="absolute bottom-0 left-0 size-3 rounded-bl border-b-2 border-l-2 border-primary"></div>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="dialog-10-setup-key">
                Setup key
              </label>
              <input
                id="dialog-10-setup-key"
                type="text"
                readOnly
                value="JBSWY3DPEHPK3PXP"
                className="input font-mono text-sm"
              />
            </div>

            <form className="field-group">
              <div className="field">
                <label className="label" htmlFor="dialog-10-code">
                  Verification code
                </label>
                <input
                  id="dialog-10-code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="input"
                  placeholder="123456"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="btn" data-sp-dismiss="dialog">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
