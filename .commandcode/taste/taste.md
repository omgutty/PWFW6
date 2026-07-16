# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# workflow
- Do not edit files or implement changes automatically; always present suggestions first and keep the user in the loop for every action. Confidence: 0.85

# test-data
- Separate invalid test users into a dedicated `invalidUsers[]` array instead of mixing them with valid users in the test data JSON. Confidence: 0.70

# security
- Never store credentials (usernames, passwords, base URLs) in JSON test data files or config files that get committed to git; use GitHub secrets, environment variables, or local-only credential files instead, and ensure credentials are never visible in test reports or logs. Confidence: 0.85

# architecture
See [architecture/taste.md](architecture/taste.md)
- Keep test bodies at 3-5 lines max: setup, action, assertion. Complex logic goes in modules. Confidence: 0.70
- Use `beforeEach` for shared setup (login, navigation) when multiple tests in a suite need it. Confidence: 0.70
- Use `page.waitForURL()` after navigation actions instead of arbitrary `waitForTimeout()`. Confidence: 0.70
- Separate API concerns into a `services/` directory — modules handle UI workflows, services handle HTTP calls, never mix the two. Confidence: 0.80
# typescript
- Use strict TypeScript with interfaces for all data structures; avoid `any`, prefer `unknown` with type guards. Confidence: 0.90
- All async page/module methods that fetch data must return typed promises. Confidence: 0.85
- Use `strictNullChecks`: always handle null/undefined returns from `textContent()`, `inputValue()`, etc. with fallback values. Confidence: 0.85

# fixtures
- Register every module as a fixture in `fixtures/index.ts` — tests should never call `new ModuleName(page)`. Confidence: 0.85
- Name fixtures consistently: lowercase camelCase (e.g., `signinModule`, `psoModule`). Confidence: 0.85
- Use an `authenticatedPage` fixture for tests that need a pre-logged-in state to avoid repeating login in every test. Confidence: 0.70
- Provide separate authenticated module fixtures (e.g., `authenticatedPSOModule`) alongside plain module fixtures rather than baking login into the module fixture itself — tests choose which to inject. Confidence: 0.75

# testing
- Run tests with `--headed` flag when debugging to visually verify browser behavior during development. Confidence: 0.70
- Use `test.describe()` with tag prefixes as the first line for test organization and tagging. Confidence: 0.90
- Wrap every logical action in `test.step()` with descriptive names for report clarity. Confidence: 0.85
- Name tests as behavior statements (e.g., `should show error for locked user`), not implementation statements. Confidence: 0.80
- Use data-driven tests with `for...of` loops for multi-scenario validation. Confidence: 0.85

# environment-config
- Use a single config source (`src/config/index.ts`) that owns all env vars and exports typed config — no `process.env` scattered across files. Confidence: 0.90
- `playwright.config.ts` imports from `config/index.ts` and never duplicates env values. Confidence: 0.90
- No hardcoded URLs, credentials, or timeouts — only in `.env` or env-specific config files. Confidence: 0.90
- Keep `.env` gitignored; commit `.env.example` (without real values) as a template. Confidence: 0.75
- Use a `requireEnv()` runtime validation function in config that crashes fast with a descriptive message if a required env var is missing, instead of using silent fallbacks like `process.env.X ?? 'default'`. Confidence: 0.85

# naming
- Use verb-first method names: `enterUsername`, `clickLogin`, `fetchRunningBusCount`, `navigateToPSO`. Confidence: 0.85
- Use barrel exports (`index.ts`) in every folder — consumers import from the folder, not individual files. Confidence: 0.80
- Follow feature-based file naming: `{Feature}Page.ts`, `{Feature}Module.ts`, `{feature}.spec.ts`, `{Feature}Api.ts`. Confidence: 0.90
- Prefer `fetch` prefix over `get` for async data retrieval methods (e.g., `fetchRunningBusCount` not `getRunningBusCount`). Confidence: 0.70

# locators
- Use arrow-function locators for lazy evaluation — locators are defined as functions (e.g., `const header = () => page.locator('.header')`) so they are resolved at action time, not definition time. Confidence: 0.85
- Use self-healing locators for action-only operations (click, fill); assertions should use direct locators to fail fast on incorrect state. Confidence: 0.80

# assertions
- Use locator assertions (`expect(locator).toBeVisible()`) directly in tests, not wrapped in page methods (unless reused across multiple tests). Confidence: 0.85
- Use `toContain` for partial text match and `toHaveText` for exact match. Confidence: 0.85
