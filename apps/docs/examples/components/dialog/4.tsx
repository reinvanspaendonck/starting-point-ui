import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Manage who has access to a resource",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-4"
      >
        Share
      </button>

      <dialog
        id="dialog-4"
        className="dialog"
        aria-labelledby="dialog-4-title"
        aria-describedby="dialog-4-description"
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
                id="dialog-4-title"
                className="text-lg font-semibold tracking-tight"
              >
                Share project
              </h2>
              <p
                id="dialog-4-description"
                className="text-sm/6 text-muted-foreground mt-2"
              >
                Invite people to collaborate on this project.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="email"
                className="input flex-1"
                placeholder="Add people by email"
              />
              <button type="button" className="btn">
                Invite
              </button>
            </div>

            <div className="separator"></div>

            <div className="grid gap-4">
              <span className="text-sm font-medium">People with access</span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    className="avatar"
                    src="https://cdn.gufo.dev/stockphotos/1c7a7245.webp"
                    alt="Sarah Johnson"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">Sarah Johnson</p>
                    <p className="text-muted-foreground">sarah@example.com</p>
                  </div>
                </div>
                <select className="select h-8 w-24" defaultValue="owner">
                  <option value="owner">Owner</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    className="avatar"
                    src="https://cdn.gufo.dev/stockphotos/7bd8889a.webp"
                    alt="Michael Chen"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">Michael Chen</p>
                    <p className="text-muted-foreground">michael@example.com</p>
                  </div>
                </div>
                <select className="select h-8 w-24" defaultValue="editor">
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    className="avatar"
                    src="https://cdn.gufo.dev/stockphotos/a8a338c1.webp"
                    alt="Emma Wilson"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">Emma Wilson</p>
                    <p className="text-muted-foreground">emma@example.com</p>
                  </div>
                </div>
                <select className="select h-8 w-24" defaultValue="viewer">
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              data-sp-dismiss="dialog"
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
