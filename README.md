## Conventions

- **Routing:** Next.js App Router unter `src/app`.
- **Struktur:** `src/components`, `src/lib`, `src/types`, `src/styles`, `public`.
- **Benennung:** Dateien/Ordner `kebab-case`; React-Komponenten `PascalCase`; Hooks `useX.ts`.
- **Imports:** 1) Node/Std 2) externe Pakete 3) interne via `@/*`.
- **Aliase:** `@/*` → `./src/*` (siehe tsconfig).
- **CSS:** Globales CSS unter `src/styles`. (Tailwind: pending Entscheidung)
- **Linter/Formatter:** ESLint + Prettier (keine ungenutzten Variablen, geordnete Imports).
