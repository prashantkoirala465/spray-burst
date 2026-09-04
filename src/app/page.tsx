import { SprayBurstCard } from "@/components/spray-burst/spray-burst-card";

const BUILT_FROM = [
  "One rule holds the whole piece together: the drawings change and the print does not. Every scene resolves to a signed distance, every distance goes through the same coverage-and-dither, and the paper stays the same warm off-white in all six.",
  "Every pixel is exactly one of three inks — no anti-aliasing, no alpha blending anywhere. Coverage against distance is a logistic curve dithered against a per-pixel hash, plus a sparse far tail that carries isolated specks past the edge the way overspray does.",
  "The hash is seeded from the frame index, not from a clock, so every frame re-rolls its own grain and holds it steady within itself. That's the boil — the reason it reads as drawn rather than rendered.",
  "Playback steps at 24fps and never interpolates. No frame is ever held here — all of them are different drawings — so the step costs less than a smooth version would, not more.",
];

const CONSTRAINTS = [
  "Each drawing gets its own multiplier on the ink spray and grain, bounded to roughly 0.7x–1.5x, indexed by drawing rather than playback position — the same screen and ink lay down differently depending on how much open area the stencil has.",
  "A crowd of discs fuses by taking the minimum of their signed distances — a union, not an outline — which is the only way overlapping circles become a compound blob instead of a diagram.",
  "The starburst's rays are matched index-by-index between poses and interpolated along the shortest angular path, built at each pose's own station rather than the travelling centre, so a ray never appears to cut or spin the long way round.",
  "Six cursor gestures — reach, face, aim, drag, gather, swell — implemented once each and chosen per drawing from what that drawing already is: spikes reach, a cluster of fusing discs gets crowded, a stencil aims as one body because a stencil doesn't shear.",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
        <span className="text-sm font-bold tracking-tight">Spray Burst</span>
        <a
          href="https://github.com/prashantkoirala465/spray-burst"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            A screenprint that keeps reprinting itself.
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            A coloured plate on cream paper, an ink drawing on the plate,
            every edge a sprayed dither instead of a clean line, the whole
            thing boiling at 24fps. Six drawings cycle through in their own
            three inks — rings, bars, discs, wedges, a starburst, a swelling
            field of dots — while the paper and the press never change.
          </p>
        </div>

        <SprayBurstCard />

        <p className="text-sm text-muted">
          Move your pointer across it — the ink lays on heavier under your
          hand, and each drawing answers in its own way.
        </p>
      </main>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              How it&apos;s built
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {BUILT_FROM.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              Constraints
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {CONSTRAINTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span>© {year} Prashant Koirala</span>
          <a
            href="https://github.com/prashantkoirala465/spray-burst"
            className="transition-colors hover:text-foreground"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
