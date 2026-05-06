import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Welcome a user to a team",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-5"
      >
        View invitation
      </button>

      <dialog
        id="dialog-5"
        className="dialog"
        aria-labelledby="dialog-5-title"
        aria-describedby="dialog-5-description"
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
              <div className="avatar-group justify-center mb-4">
                <img
                  className="avatar avatar-group-item"
                  src="https://cdn.gufo.dev/stockphotos/1c7a7245.webp"
                  alt="Emma Wilson"
                />
                <img
                  className="avatar avatar-group-item"
                  src="https://cdn.gufo.dev/stockphotos/7bd8889a.webp"
                  alt="Michael Chen"
                />
                <img
                  className="avatar avatar-group-item"
                  src="https://cdn.gufo.dev/stockphotos/a8a338c1.webp"
                  alt="Sarah Johnson"
                />
              </div>
              <h2
                id="dialog-5-title"
                className="text-lg font-semibold tracking-tight text-center"
              >
                Welcome to Team Atlas
              </h2>
              <p
                id="dialog-5-description"
                className="text-sm/6 text-muted-foreground mt-2 text-center"
              >
                You&apos;ve been added as a Member. Say hi to your new
                teammates and start collaborating.
              </p>
            </div>

            <button type="button" className="btn btn-primary" data-sp-dismiss="dialog">
              Get started
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
