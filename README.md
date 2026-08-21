# Saucedemo Playwright Automation Framework

This is an end-to-end test automation project for [saucedemo.com](https://www.saucedemo.com/), built with Playwright and TypeScript. It follows the Page Object Model (POM) pattern and uses Playwright's custom fixtures to keep tests clean and reusable.

I built this project to practice writing maintainable UI automation. It started as simple, raw locator-based tests and grew into a structured framework as I learned more.

## Tech Stack

- Playwright (end-to-end testing framework)
- TypeScript
- Page Object Model (POM)
- Custom Playwright fixtures for injecting page objects into tests

## Project Structure

```
├── pages/                  # Page Object classes, one per app page
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── ...
├── tests/                  # Test specs, grouped by feature/page
│   ├── login.spec.ts
│   └── inventory.spec.ts
├── fixtures.ts             # Custom fixtures that wire page objects into tests
├── playwright.config.ts    # Playwright configuration
└── README.md
```

## Design Decisions

**Page Object Model.** Each page of the app has its own class with clear, readable methods like `login()` and `addProductToCart()`. Test files never touch raw locators directly.

**Actions kept separate from assertions.** Methods either do something (like `addProductToCart`) or verify something (like `expectErrorMessage`), never both. This keeps action methods reusable in both positive and negative test scenarios, instead of forcing an assertion every time an action runs.

**Custom fixtures instead of `beforeEach`.** Page objects are injected as fixtures, so a test only asks for what it actually needs (`{ loginPage, inventoryPage }`), and setup logic lives in one place instead of being copied into every file.

**Stable locators.** Tests use `data-test` attributes, configured as Playwright's `testIdAttribute`, instead of CSS classes or ids. `data-test` exists specifically for automation, so it's less likely to break when the site's styling changes.

## Setup

```bash
git clone https://github.com/AbdelbaryN/saucedemo-playwright-pom.git
cd saucedemo-playwright-pom
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests headless
npx playwright test

# Run with interactive UI mode
npx playwright test --ui

# Run one file
npx playwright test tests/login.spec.ts

# View the HTML report after a run
npx playwright show-report
```

## Test Coverage

| Page      | Scenarios covered                                                                 |
|-----------|-------------------------------------------------------------------------------------|
| Login     | Valid login, invalid username, locked-out user, empty credentials                  |
| Inventory | Add to cart, remove from cart, add multiple items, cart badge count, Remove button state |

*(This table will grow as I add Cart and Checkout coverage.)*

## Roadmap

- [x] Raw Playwright tests against saucedemo
- [x] Refactor into Page Object Model
- [x] Add custom fixtures for dependency injection
- [x] Build LoginPage and InventoryPage
- [ ] Build CartPage
- [ ] Build CheckoutPage
- [ ] Write a full end-to-end purchase flow test
- [ ] Try Playwright's agent tools (planner, generator, healer) for AI-assisted test authoring

## Why I Built This

I wanted hands-on practice with the patterns that matter once a test suite grows past a handful of files: keeping tests maintainable with POM, avoiding repetition with fixtures, and using locators that don't break every time the site's styling changes.
