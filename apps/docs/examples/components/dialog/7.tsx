import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Confirm a destructive action with password verification",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn btn-destructive"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-7"
      >
        Delete account
      </button>

      <dialog
        id="dialog-7"
        className="dialog"
        aria-labelledby="dialog-7-title"
        aria-describedby="dialog-7-description"
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
                id="dialog-7-title"
                className="text-lg font-semibold tracking-tight"
              >
                Delete account
              </h2>
              <p
                id="dialog-7-description"
                className="text-sm/6 text-muted-foreground mt-2"
              >
                This will permanently remove your account and related data.
                Warning, this cannot be undone.
              </p>
            </div>

            <form className="grid gap-6">
              <div className="field">
                <label htmlFor="dialog-7-password" className="label">
                  Password confirmation
                </label>
                <div className="input-group">
                  <input
                    id="dialog-7-password"
                    name="password"
                    type="password"
                    className="input"
                  />
                  <button
                    type="button"
                    className="input-group-btn-icon"
                    aria-label="Show password"
                    tabIndex={-1}
                  >
                    <svg data-icon="eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                    <svg data-icon="eye-off" className="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="btn" data-sp-dismiss="dialog">
                  Cancel
                </button>
                <button type="submit" className="btn btn-destructive">
                  Delete account
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
