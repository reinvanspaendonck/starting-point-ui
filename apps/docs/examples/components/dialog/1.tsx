import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Confirm an action",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-1"
      >
        Save changes
      </button>

      <dialog
        id="dialog-1"
        className="dialog"
        aria-labelledby="dialog-1-title"
        aria-describedby="dialog-1-description"
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
                id="dialog-1-title"
                className="text-lg font-semibold tracking-tight"
              >
                Save changes
              </h2>
              <p
                id="dialog-1-description"
                className="text-sm/6 text-muted-foreground mt-2"
              >
                Your changes will be applied immediately and visible to
                everyone with access to this project.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="btn" data-sp-dismiss="dialog">
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
