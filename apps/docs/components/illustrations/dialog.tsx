export function DialogIllustration() {
  return (
    <div className="pointer-events-none [--border:--alpha(var(--color-black)/7%)] [--btn-from:--alpha(var(--color-primary)/90%)] [--btn-to:var(--color-primary)] dark:[--border:--alpha(var(--color-white)/3%)] dark:[--btn-from:var(--color-primary)] dark:[--btn-to:--alpha(var(--color-primary)/90%)]">
      <div className="relative w-full max-w-44 mx-auto rounded-2xl border bg-linear-to-b from-[color-mix(in_srgb,var(--card)_96%,var(--color-white))] to-[color-mix(in_srgb,var(--card)_99%,var(--color-black))] text-card-foreground shadow-md/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_-1px_--theme(--color-white/6%),0_1px_--theme(--color-black/6%)] not-dark:bg-clip-padding dark:to-[color-mix(in_srgb,var(--card)_98%,var(--color-white))] [--radius-2xl:14px] overflow-hidden">
        <div className="absolute right-2.5 top-2.5 size-2 rounded-sm bg-muted-foreground/25" />
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col gap-1.5">
            <div className="h-1.5 w-[55%] rounded-full bg-muted-foreground/40" />
            <div className="h-1.5 w-[80%] rounded-full bg-muted-foreground/20" />
            <div className="h-1.5 w-[60%] rounded-full bg-muted-foreground/20" />
          </div>
          <div className="flex justify-end gap-1.5">
            <div className="h-3.5 w-9 rounded-sm border bg-muted/40" />
            <div className="h-3.5 w-11 rounded-sm bg-linear-to-b from-(--btn-from) to-(--btn-to)" />
          </div>
        </div>
      </div>
    </div>
  );
}
