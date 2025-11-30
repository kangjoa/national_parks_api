# Adding tests

## Getting started

Documentation: [Add vitest to your project](https://vitest.dev/guide/)

Install:
`npm install --save-dev vitest`

Update `package.json`:

```zsh
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

This allows you to run `npm test` or `npm run test:watch`. When you run `npm test` npm looks for the "test" script in your `package.json` and runs it.

## Tests description

The test suite in `resolvers.test.js` covers critical functionality of the GraphQL resolvers:

**getParks resolver:**

- Basic park fetching without search (verifies data structure)
- Search by park name (tests filtering logic and case-insensitive matching)
- Search by state (tests state-based filtering)
- Pagination (ensures correct offset/limit handling)
- Error handling (verifies graceful failure when API calls fail)

**getParksByIds resolver:**

- Fetching parks by specific IDs (tests favorites functionality)
- Error handling (ensures proper error propagation)

These tests are essential for refactoring as they verify that critical behaviors remain intact when code is restructured.
