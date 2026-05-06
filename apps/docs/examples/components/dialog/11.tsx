import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "One-time recovery codes",
};

const codes = [
  "a1b2c-3d4e5",
  "f6g7h-8i9j0",
  "k1l2m-3n4o5",
  "p6q7r-8s9t0",
  "u1v2w-3x4y5",
  "z6a7b-8c9d0",
  "e1f2g-3h4i5",
  "j6k7l-8m9n0",
];

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-11"
      >
        Show recovery codes
      </button>

      <dialog
        id="dialog-11"
        className="dialog"
        aria-labelledby="dialog-11-title"
        aria-describedby="dialog-11-description"
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
              <h2 id="dialog-11-title" className="text-lg font-semibold tracking-tight">
                Recovery codes
              </h2>
              <p id="dialog-11-description" className="text-sm/6 text-muted-foreground mt-2">
                Store these codes safely. Each can be used once if you lose access to your authenticator app.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-lg border bg-muted/50 p-3">
              {codes.map((code) => (
                <code
                  key={code}
                  className="rounded border bg-background px-2 py-1.5 text-center font-mono text-xs"
                >
                  {code}
                </code>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="btn" data-sp-dismiss="dialog">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Regenerate codes
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
