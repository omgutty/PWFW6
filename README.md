# PWFW6 — Playwright Test Automation Framework

A modular test automation framework for the **PTA** application, built with **Playwright + TypeScript** using a **3-Layer Architecture** (Pages → Modules → Tests) with reusable **Components** and **Services** layers.

---

## Project Structure

```
PWFW6/
├── src/
│   ├── components/               # Reusable UI components
│   │   └── Header.ts             # Shared header (nav, logout) — composed into pages
│   ├── pages/                    # Layer 1: Page Objects
│   │   ├── BasePage.ts           # Abstract base (goto, gettext, dropdown helpers)
│   │   ├── SignInPage.ts         # Login form locators & actions
│   │   ├── PSOPage.ts            # PSO dashboard — bus counts, route navigation
│   │   └── PSDPage.ts            # PSD detail page (post-route-click)
│   ├── modules/                  # Layer 2: Business Logic
│   │   ├── SignInModule.ts       # Login workflow + invalid login handling
│   │   └── PSOModule.ts          # PSO workflows: bus counts, route navigation
│   ├── tests/                    # Layer 3: Test Specs
│   │   ├── Signin.spec.ts        # Login tests (valid + invalid credentials)
│   │   └── PSO.spec.ts           # PSO dashboard tests (bus counts, navigation)
│   ├── fixtures/index.ts         # Custom fixtures (signinModule, psoModule, etc.)
│   ├── config/index.ts           # Single source of truth — env vars, typed config
│   ├── testdata/
│   │   ├── user.json             # User metadata (no credentials — env-only)
│   │   └── type.ts               # User, UsersData interfaces
│   ├── utils/
│   │   ├── Logger.ts             # Structured logging with step/test lifecycle
│   │   ├── SelfHealingLocator.ts # Locator fallback engine
│   │   └── CustomTTAReporter.ts  # Branded HTML reporter
│   └── api/                      # API testing layer
├── playwright.config.ts
├── tsconfig.json
├── .env                          # Local credentials (gitignored)
├── .env.example                  # Template for env vars (committed)
└── package.json
```

---

## Architecture

### 4-Layer Design

```
Tests (spec.ts)
    ↓
Modules (business workflows, orchestration)
    ↓
Pages (locators, single actions) ← → Components (shared UI blocks)
    ↓
Services (API calls, data layer)
```

### Core Principles

| Principle | Rule |
|-----------|------|
| **Layer isolation** | Tests call Modules only — never Pages or Components directly |
| **Page returns page** | Navigation actions return the next page object: `clickLogin() → new DashboardPage(page)` |
| **Component composition** | Shared UI (Header, Grid) lives in `components/`, composed into pages that need it |
| **Modules own workflows** | A module method handles the full flow — navigation → action → wait — tests stay at assertion level |
| **Pages own locators** | One method = one action (click, fill, getText). No `if/else`, no business logic |

---

## Security & Configuration

### Credentials

- **Never** stored in JSON, source code, or config files committed to git
- Stored in `.env` (gitignored) and GitHub Secrets in CI
- Loaded via `config/index.ts` with runtime validation (`requireEnv()`)

```
.env (local only)
├── BASE_URL
├── TEST_USERNAME / TEST_PASSWORD      → valid login
└── INVALID_USERNAME / INVALID_PASSWORD → invalid login scenarios
```

### Password Redaction

All passwords are redacted in logs and reports — the logger shows `enter password: ***` instead of the actual value.

---

## Test Data

```
user.json
├── ptaLive[]       → valid live users (metadata only: id, role)
├── ptaTest[]       → test environment users
├── pknLive[]       → PKN environment users
└── invalidUsers[]  → invalid credential scenarios
```

Credentials are not in JSON — loaded from `.env` via `config`. JSON holds only scenario metadata for future test data validation.

---

## Tagging Convention

| Tag     | Priority | Filter |
|---------|----------|--------|
| `@P0`   | Critical | `--grep @P0` |
| `@P1`   | High     | `--grep @P1` |
| `@Smoke` | Smoke   | `--grep @Smoke` |

Tags are set in `test.describe()` blocks for suite-level filtering.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests (headless) |
| `npx playwright test --headed` | Run with browser visible |
| `npx playwright test --grep @Smoke` | Run smoke tests only |
| `npx playwright test src/tests/Signin.spec.ts` | Run specific spec |

---

## Key Patterns

- **3-Layer strict**: Tests → Modules → Pages — never skip
- **Arrow-function locators**: Lazy evaluation, resolved at action time
- **Custom fixtures**: All DI via `fixtures/index.ts` — tests never call `new`
- **test.step()**: Every logical action wrapped for report clarity
- **Fluent page transitions**: Navigation methods return the next page object
- **Self-healing for actions only**: Click/fill use fallback arrays; assertions use direct locators
- **Data-driven tests**: `for...of` loops over test data arrays for multi-scenario validation
- **Environment-driven config**: All URLs, credentials, and timeouts from env vars
