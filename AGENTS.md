## Conformance check

Lint only catches what lint can see. Every rule in this file that needs judgement (comments, naming, single purpose, duplication, hierarchy, props placement, ESNext usage) has drifted before, so at the end of every non-trivial task (more than one file touched, or any new file) and before reporting it done:

1. Run checks from the repo root. It runs typecheck, eslint, prettier. All must pass.
2. Spawn a subagent on the lightweight model (`Agent` tool with `model: "haiku"`, for speed and cost). Give it this file and the full change set (`git diff` plus every untracked file), and have it report every violation of the rules below, grouped by rule, with `file:line` and a one-line quote. Comments first, since that is where drift has been worst.
3. Fix everything it reports, rerun step 1, and list any judgement calls in the response.

## Code Style

### General

- No comments. Code names things; the name is the documentation. Only add a comment when a constraint, workaround, or non-obvious invariant cannot be expressed in code — and even then, one line.
- Names must be fully descriptive. Avoid non-standard abbreviations (`leftWristLandmark` not `lwLm`, `computeScale` not `cs`). Standard abbreviations used universally in the domain are fine (`url`, `id`, `rgb`, `fps`).
- Event and action handlers start with `handle` where possible (`handleClick`, `handleKeyboardFocus`).
- Functions have a single purpose. If a function does two things, it should be two functions.
- Prefer pure functions. Avoid shared mutable state.
- Separation of concerns: each file has one job. Keep side effects at the edges.

### TypeScript / React

- Modern ESNext, written the way the language is used today rather than the way it was most commonly written. Concretely:
  - ES modules only. Never `require`, `module.exports`, or CommonJS-era folder conventions.
  - Every import names a file, never a folder. No barrel files: never create an `index.ts` that re-exports a folder's contents. Omit the `.ts`/`.tsx` extension; keep it on anything the bundler resolves by extension, such as `.css` and `.json`.
    ```ts
    import Counter from "./Counter/Counter";
    import { useCounterStore } from "./Counter/counterStore";
    import "./Counter/Counter.css";
    ```
  - `import type` for types (`verbatimModuleSyntax` is on), `const` by default, `let` only when reassigned, never `var`.
  - Use the language's own features before reaching for helpers or libraries: optional chaining and `??` over manual guards, `at()`, `toSorted()`, `structuredClone`, `Object.groupBy`, `Array.fromAsync`, `Promise.withResolvers`, `using`, top-level `await` where they read cleanly.
  - If a pattern exists only because older runtimes or bundlers needed it, do not use it. When unsure whether something is current, read `frontend/tsconfig.json` and two existing files in the same folder and match them.
- Arrow functions throughout, no `function` keyword declarations.
- `type` not `interface`.
- Every React component file exports exactly one component. A `ComponentNameProps` type sits directly above it:
  ```tsx
  type CounterProps = { value: number };
  const Counter = ({ value }: CounterProps) => <span>{value}</span>;
  export default Counter;
  ```
- Prop types can be shared across components, but must be named with a `Shared` prefix and live in a shared types file (e.g. `SharedScreenProps`). A local props type is always named `ComponentNameProps`.
- Component files are named after their component (`Counter.tsx`, not `counter.tsx`).
- All lint rules must pass (`eslint`, `prettier`). If a rule must be suppressed, add an inline disable with a one-line reason:
  ```ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- external lib returns untyped payload
  ```
  Always call this out in your response when you do it.
- `src/components/ui/**` is vendored shadcn output, not hand-written code. It is exempt from every rule in this section and is excluded from `eslint` and `prettier`. Regenerate it with the shadcn CLI rather than editing or reformatting it; wrap it in your own component when you need different behaviour.

## File System Hierarchy

The directory tree tells the story of component ownership. A component lives next to the component that owns it. Shared components live at the deepest path that is still an ancestor of every consumer — never hoisted higher than necessary.

A folder holds exactly one component, plus its styles and utilities. If a second component appears, it gets its own folder — either as a sibling (if it stands alone) or as a child (if the first component owns it).

```
src/
  Canvas/          # Canvas and everything Canvas owns
    Apple/
    Viewport/
  Vision/          # Vision and everything Vision owns
    inference/
    Preview/
    Setup/
  screens/         # Screen-level layout components
  hooks/           # App-wide custom hooks
  types/           # Shared type definitions
  preview/         # Preview wrapper (shared by multiple screens)
```

## Dependencies

Always install the latest version using the package manager:

```bash
npm install <package>          # frontend
cargo add <crate> --manifest-path backend/Cargo.toml     # Rust
```

Never manually write a version into `package.json` or `Cargo.toml` unless there is a concrete, documented reason to pin (e.g. an upstream bug, an API break, an incompatible peer constraint). If you pin a version, note the reason in your response.
