import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Successful publish with a copyable share link",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-2"
      >
        Publish project
      </button>

      <dialog
        id="dialog-2"
        className="dialog"
        aria-labelledby="dialog-2-title"
        aria-describedby="dialog-2-description"
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
                id="dialog-2-title"
                className="text-lg font-semibold tracking-tight"
              >
                Project published
              </h2>
              <p
                id="dialog-2-description"
                className="text-sm/6 text-muted-foreground mt-2"
              >
                Your project is now live. Share the link with your team to
                start collaborating and gather feedback.
              </p>
            </div>

            <div className="field">
              <label className="label" htmlFor="dialog-2-link">
                Share link
              </label>
              <div className="flex gap-2">
                <input
                  id="dialog-2-link"
                  type="text"
                  readOnly
                  value="https://app.example.com/p/atlas-9k3x"
                  className="input flex-1"
                />
                <button
                  type="button"
                  className="btn btn-icon"
                  aria-label="Copy link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </button>
              </div>
            </div>

            <button type="button" className="btn btn-primary" data-sp-dismiss="dialog">
              Done
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
