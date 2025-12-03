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

The test suite in `resolvers.test.js` covers critical functionality of the GraphQL resolvers:
