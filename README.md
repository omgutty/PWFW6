# PWFW6 — Playwright Test Automation Framework

A modular test automation framework for the **PTA** application, built with **Playwright + TypeScript** using a **3-Layer Architecture** (Pages → Modules → Tests).

## Project Structure

```
PWFW6/
├── src/
│   ├── pages/                    # Layer 1: Page Objects
│   │   ├── BasePage.ts           # Abstract base (goto, gettext, dropdown helpers)
│   │   ├── SignInPage.ts         # PTA login form locators & actions
│   │   └── PSOPage.ts            # Post-login landing page
│   ├── modules/                  # Layer 2: Business Logic
│   │   ├── SignInModule.ts       # Login workflow, invalid login handling
│   │   └── LoginModule.ts        # (old SauceDemo — to be removed)
│   ├── tests/                    # Layer 3: Test Specs
│   │   └── Signin.spec.ts        # PTA login tests (valid + invalid)
│   ├── fixtures/index.ts         # Custom fixtures (signinModule, etc.)
│   ├── config/index.ts           # Single source of truth (baseUrl, credentials)
│   ├── testdata/
│   │   ├── user.json             # PTA users (ptaLive, ptaTest, pknLive, invalidUsers)
│   │   └── type.ts               # User, UsersData interfaces
│   ├── utils/
│   │   ├── Logger.ts             # Structured logging with step/test lifecycle
│   │   ├── SelfHealingLocator.ts # Locator fallback engine
│   │   └── CustomTTAReporter.ts  # Branded HTML reporter
│   └── api/                      # API testing layer
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Test Data Structure

```
user.json
├── ptaLive[]       → valid live users (admin: ca_admin / ca@123)
├── ptaTest[]       → test environment users
├── pknLive[]       → PKN environment users
└── invalidUsers[]  → invalid credential scenarios
```

## Tagging Convention

| Tag     | Usage         |
|---------|---------------|
| `@P0`   | Critical      |
| `@P1`   | High priority |
| `@Smoke` | Smoke suite  |

## Key Patterns

- **3-Layer strict**: Tests call Modules, Modules call Pages — never skip
- **Arrow-function locators**: Lazy evaluation, resolved at action time
- **Custom fixtures**: All DI via `fixtures/index.ts` — tests never instantiate manually
- **test.step()**: Every logical action block wrapped for reporting
- **JSON test data + TypeScript casting**: Data in `.json`, typed via interfaces
- **Self-healing for actions only**: Click/fill use fallback arrays; assertions use direct locators
