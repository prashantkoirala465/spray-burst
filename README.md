# Spray Burst

A screenprint that keeps reprinting itself: a coloured plate on cream paper, an ink drawing on the plate, every edge a sprayed dither rather than a clean line, and the whole thing boiling at 24fps. Six drawings cycle through, three seconds each, each in its own three inks — a starburst touring its plate, rings each broken by a turning gap, thick bars sliding across each other, a crowd of discs drifting together into blobs, a pinwheel of hard-edged wedges, and a halftone field of dots swelling under a travelling wave.

## Why

The whole piece hangs on one rule: the drawings change and the print does not. Every scene resolves to a signed distance, every distance goes through the same coverage-and-dither, and the paper stays the same warm off-white in all six. Get that wrong and it's six unrelated cards; get it right and it's one press running six jobs.

That print is also the reason nothing here is anti-aliased. A signed distance becomes a coverage probability through a logistic curve, and coverage gets dithered against a per-pixel hash rather than blended — every pixel ends up exactly one of three flat inks. The hash reseeds from the frame index rather than a clock, so every frame re-rolls its own grain and holds it steady within itself. That's the boil, and it's the reason the piece reads as drawn rather than rendered.

## How it works

- **One WebGL1 program, six drawings.** All six scenes share a single shader dispatched on a uniform branch — free, since the branch is the same for every fragment in a draw — with per-frame numbers packed into two general-purpose float arrays whose meaning changes per scene, documented at the top of the shader.
- **Playback steps at 24fps and never interpolates.** No frame is ever held here — all of them are different drawings — so skipping ahead to the next 24fps index costs less than a smooth version, not more.
- **Nothing drifts linearly.** Every drawing moves on a sampled table with a long hold, a fast crossing, another long hold — never a straight-line ease — with two severities: a hard snap for drawings that should look re-registered by hand, a softer glide for orbits and waves where a hard step reads as a dropped frame.
- **Discs fuse by taking the minimum of their signed distances** — a union, not an outline — which is the only way overlapping circles become a compound blob instead of a diagram. Wedge gaps are cut with a `max()` against an angular wedge rather than a clipped arc, so the cut ends carry a real signed distance and spray like every other edge.
- **The starburst's core is a star, not a disc**, peaking exactly at each ray's bearing with a shoulder rather than a sharp point, and its rays are matched index-by-index between poses and interpolated along the shortest angular path so a ray never appears to cut or spin the long way round.
- **Six cursor gestures — reach, face, aim, drag, gather, swell — each implemented once** as a geometric primitive, then chosen per drawing from what that drawing already is: spikes reach toward the pointer, a cluster whose whole point is discs fusing gets crowded so it fuses harder, a stencil aims as one body because a stencil doesn't shear.

## Stack

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS v4
- **Rendering:** a single WebGL1 fragment shader over a full-screen triangle — no scene graph, no per-object draw calls, DPR capped at 1.5

The animation (`src/components/spray-burst/`) doesn't import React or Next — `engine.ts` compiles the shader and drives it from a plain class, `params.ts` holds the measured tables (poses, palettes, motion curves, per-drawing spray/grain multipliers), and `spray-burst-card.tsx` is the thin wrapper that mounts it and watches for visibility, reduced-motion, and pointer position.

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
