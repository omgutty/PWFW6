# LinkedIn Learning Log — PWFW6 Framework

> **How to use this file:**
> Each day we work on the framework, add a new `## YYYY-MM-DD` section below.
> For each entry, cover:
> - What was implemented / developed
> - Challenges faced and how they were overcome
> - What was learned (new concepts, patterns, tools)
> - What was adopted into the framework and why (compare old vs new approach)
> - Key decisions made and the reasoning behind them
>
> At the end of each entry, include a **ready-to-post LinkedIn caption** under `### LinkedIn Post`.
> The caption should be professional, educational, and showcase real engineering decisions — not just "I did X".
> Target audience: QA engineers, SDETs, automation architects.

---

## 2026-07-15

### What We Implemented

- Restructured test data JSON with dedicated `invalidUsers[]` array — separated valid and invalid login scenarios instead of mixing them in a single `ptaLive[]` array
- Moved all credentials (usernames, passwords) out of JSON and config fallbacks into `.env` — credentials are now environment-only and never committed to git
- Created `.env.example` as a committed template for other developers
- Added `requireEnv()` runtime validation in `config/index.ts` — crashes fast with a clear message if a required env var is missing
- Redacted passwords in logger output — `enter password: ***` instead of `enter password: ca@123`
- Created `components/` layer with `Header.ts` — reusable header component for shared navigation across 45+ pages
- Built `PSOModule` and extended `PSOPage` with bus count fetching methods (running count, target count)
- Created `PSO.spec.ts` — first PSO dashboard test validating running bus count > 0
- Created `PSDPage` for post-route-click navigation flow
- Registered `psomodule` fixture in `fixtures/index.ts` — tests inject `{ psoModule }`, never instantiate manually
- Cleaned out old SauceDemo fixtures (`loginPage`, `inventoryPage`, `cartPage`, `loginModule`, `productModule`)
- Fixed a missing `await` bug in `Signin.spec.ts` that caused `expect(...).toContain()` to receive a Promise instead of a resolved value
- Updated README to reflect current architecture and security practices
- All 3 tests passed at 100% (valid login, invalid login, PSO bus count)

### Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Credentials visible in JSON, config fallbacks, and logs | Moved all secrets to `.env` (gitignored), added `requireEnv()` validation, redacted passwords in logger |
| `ptaLive[1]` was a magic index — fragile and unclear | Restructured JSON with dedicated `invalidUsers[]` array — now `invalidUsers[0]` is self-documenting |
| `fetchPSOPageLabel()` wasn't awaited — `toContain` received a Promise | Added `await` — the error `received is not iterable` was masking the real issue |
| `.RunningBoards-header` timed out in headless | Login flow now waits for navigation via page element resolution (not arbitrary timeout) |
| Old SauceDemo fixtures cluttering the fixture file | Removed all unused imports and fixture registrations — cleaner DI container |

### What We Learned

1. **Component layer pattern** — When 45+ pages share the same header, put it in `components/` and compose it into pages. One locator change in `Header.ts` fixes all 45 pages. Old approach would have duplicated header locators across every page object.

2. **Security-first test data design** — JSON test data files get committed to git. Credentials in JSON = credentials in git. The fix: JSON holds only scenario metadata (id, role). Credentials live in `.env` loaded via `config/index.ts` with `requireEnv()` runtime validation. This also enables different credentials per environment (dev/staging/prod) without code changes.

3. **Logger hygiene** — Logging `enter password: ${password}` exposes secrets in CI logs and HTML reports. Redacting to `***` is a one-line change that eliminates an entire class of security risk.

4. **Fluent page transitions** — Returning `new PSOPage(this.page)` from `clickonLoginbutton()` enables clean test assertions like `const label = await pasopage.fetchPSOPageLabel()`. The next page object is immediately available — no separate navigation step needed.

5. **requireEnv() pattern** — Using `process.env.X ?? 'fallback'` silently masks missing env vars in CI. `requireEnv()` throws immediately with a descriptive message, preventing cryptic timeouts from missing configuration.

### Architecture Decisions

| Decision | Old Approach | New Approach | Reason |
|----------|-------------|--------------|--------|
| Credential storage | Hardcoded in JSON + config fallbacks | `.env` only with `requireEnv()` | Security, environment isolation |
| Test data structure | All users in `ptaLive[]` — mixed valid/invalid | Separate `invalidUsers[]` array | Self-documenting, type-safe |
| Shared UI | Duplicated locators across 45+ pages | Single `Header.ts` component | DRY, one-change-fixes-all |
| Module-layer login wait | Done inside `dologin()` | Removed from module — test handles via page return | Flexibility — caller decides what to wait for |
| Fixture registration | Manual per test | Centralized in `fixtures/index.ts` | DI container pattern, no `new` in tests |

### LinkedIn Post

```
🚀 Day 1 of building a production-grade Playwright automation framework

Today wasn't about writing tests. It was about designing the foundation.

Three decisions that shaped the day:

1️⃣ Security-first data architecture
We moved ALL credentials out of JSON files and config defaults into .env.
Why? JSON gets committed to git. Config fallbacks get committed to git.
.env doesn't. One-line change: requireEnv() runtime validation that crashes
fast with a clear message instead of a cryptic timeout at 2 AM.

2️⃣ Component layer for 45+ pages
Our app has a shared header across dozens of pages. Old thinking:
duplicate header locators in every page object. New thinking: one
Header.ts component. Compose it via BasePage. Change one file, fix
every page. That's scalable.

3️⃣ Logs don't get a pass on security
"enter password: ca@123" was showing up in our reports. One fix:
"enter password: ***". Simple. Non-negotiable.

3 tests. 100% pass rate. But the real win is what we won't have to
fix later.

What's your take on credential management in test automation?
.env vs GitHub Secrets vs something else?

#Playwright #TestAutomation #SDET #TypeScript #QualityEngineering #DevSecOps
```

---

> *Next entry template:*
>
> ## YYYY-MM-DD
>
> ### What We Implemented
> -
>
> ### Challenges & Solutions
> -
>
> ### What We Learned
> -
>
> ### Architecture Decisions
> -
>
> ### LinkedIn Post
> ```
>
> ```
