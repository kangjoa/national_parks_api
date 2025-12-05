# Adding tests (client)

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

Also install for a fake browser environment (needed to test `localStorage`):
`npm install -D jsdom`

Update `vite.config.ts`:

```zsh
export default defineConfig({
  test: { environment: 'jsdom' },
});
```

## Tests description

The test suite in `App.test.jsx` covers critical functionality in these areas:

- **Local storage**: Ensures favorites persist while using the app
- **Routes (home and favorites)**: Verifies navigation works correctly

These tests are essential for refactoring as they verify that critical behaviors remain intact when code is restructured.
