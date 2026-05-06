import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Accept terms of service",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-12"
      >
        Review terms
      </button>

      <dialog
        id="dialog-12"
        className="dialog"
        aria-labelledby="dialog-12-title"
        aria-describedby="dialog-12-description"
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
                id="dialog-12-title"
                className="text-lg font-semibold tracking-tight"
              >
                Terms of Service
              </h2>
              <p
                id="dialog-12-description"
                className="text-sm/6 text-muted-foreground mt-2"
              >
                Please review our terms before continuing.
              </p>
            </div>

            <div className="max-h-64 overflow-y-auto rounded-md border bg-muted/50 p-4 text-sm/6 text-muted-foreground space-y-4">
              <section>
                <h3 className="font-semibold text-foreground">1. Acceptance of Terms</h3>
                <p className="mt-1">
                  By accessing or using this service, you agree to be bound by
                  these Terms. If you do not agree to all of the terms, you may
                  not use the service.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground">2. Use of Service</h3>
                <p className="mt-1">
                  You agree to use the service only for lawful purposes and in
                  accordance with these Terms. You are responsible for all
                  activity that occurs under your account.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground">3. Privacy</h3>
                <p className="mt-1">
                  Your use of the service is also governed by our Privacy
                  Policy. Please review it to understand how we collect and use
                  your information.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground">4. Modifications</h3>
                <p className="mt-1">
                  We may modify these Terms at any time. Continued use of the
                  service after changes constitutes acceptance of the modified
                  Terms.
                </p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground">5. Termination</h3>
                <p className="mt-1">
                  We reserve the right to suspend or terminate your access to
                  the service at any time, for any reason, without notice.
                </p>
              </section>
            </div>

            <form className="grid gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="agree"
                  className="checkbox peer"
                  required
                />
                I agree to the Terms of Service
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="btn" data-sp-dismiss="dialog">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary peer-not-checked:opacity-50 peer-not-checked:pointer-events-none"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
