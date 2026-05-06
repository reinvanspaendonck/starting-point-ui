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
                <img src="/qr-placeholder.svg" alt="QR code" className="size-32" />
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
