import type { ExampleConfig } from "@/lib/examples";

export const config: ExampleConfig = {
  preset: "dialog",
  description: "Successful publish with a visual preview",
};

export default function Example() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-sp-toggle="dialog"
        data-sp-target="#dialog-3"
      >
        Publish
      </button>

      <dialog
        id="dialog-3"
        className="dialog"
        aria-labelledby="dialog-3-title"
        aria-describedby="dialog-3-description"
      >
        <div className="dialog-backdrop"></div>
        <div className="dialog-panel">
          <div className="dialog-content grid gap-6">
            <img
              src="https://images.pexels.com/photos/7932264/pexels-photo-7932264.jpeg?auto=compress&cs=tinysrgb&w=640&fit=crop"
              alt="Project cover"
              className="rounded-lg aspect-3/2 w-full object-cover"
            />

            <div>
              <h2
                id="dialog-3-title"
                className="text-lg font-semibold tracking-tight"
              >
                Project launched
              </h2>
              <p
                id="dialog-3-description"
                className="text-sm/6 text-muted-foreground mt-2"
              >
                Your project is now live. We've notified your team and posted
                an update to your channel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                Copy link
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-sp-dismiss="dialog"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
