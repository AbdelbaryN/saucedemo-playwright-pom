# SauceDemo Playwright Automation

End-to-end browser tests for [SauceDemo](https://www.saucedemo.com/), written in TypeScript with Playwright Test. The suite uses page objects and custom fixtures to keep application interactions reusable and test setup consistent.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm ci
npx playwright install
```

## Run the tests

```bash
npm test                 # Run the suite headless
npm run test:headed      # Run with a visible browser
npm run test:ui          # Open Playwright UI mode
npm run report           # Open the latest HTML report
npx playwright test tests/login.spec.ts  # Run one spec
```

The default configuration runs Chromium. Set `CI=true` to enable retries, use one worker, and reject focused tests. Traces are collected for retry attempts. The GitHub Actions workflow runs the suite for pushes and pull requests targeting `main` or `master`, then uploads the HTML report.

## Project structure

```text
pages/                     Page object classes
tests/                     Feature-focused Playwright specs
fixtures.ts                Page object fixtures
playwright.config.ts       Runner, browser, and reporting configuration
.github/workflows/         CI workflows
```

## Coverage

| Area | Scenarios |
| --- | --- |
| Login | Successful login, invalid username, locked-out user, empty credentials |
| Inventory | Add and remove products, multiple products, cart count, remove button state |
| Cart | Added items and prices, removal, badge updates, continue shopping, checkout navigation |
| Checkout | Navigation, customer information, order completion and cancellation, confirmation, item names and prices, cart-to-overview consistency |

Tests use `data-test` locators where the application provides them and role or page-specific locators elsewhere. Page objects expose actions and useful locators; tests own scenario assertions so expectations remain visible beside the behavior they verify.

## Scope

This is a UI automation sample against the public SauceDemo site. It currently targets Chromium and uses the sample application's built-in accounts and catalog. Firefox and WebKit projects can be enabled in `playwright.config.ts` when cross-browser coverage is needed.
