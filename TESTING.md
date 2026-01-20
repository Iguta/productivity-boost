Testing Strategy

Tools
- Vitest for unit testing
- React Testing Library + jsdom for component testing

Scope
- Unit tests cover must-have features per PRD:
  - Tasks: add, edit, delete, search, prioritize
  - Goals: (covered indirectly via progress utils and store)
  - Progress: weekly/monthly/yearly summaries

How to run
```
npm test
```

Files
- src/store/__tests__/tasks.test.tsx
- src/utils/__tests__/progress.test.ts

Notes
- State stores use Zustand with localStorage persistence; tests reset state as needed.
- Date-sensitive progress tests fix the reference date to avoid flakiness.
