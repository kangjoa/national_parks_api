# Refactoring Documentation

This document outlines the refactoring techniques applied to improve code quality, readability, and maintainability.

## Table of Contents

- [Refactorings](#refactorings)

  - [1. Extract Function - Favorites Utilities](#2-extract-function---favorites-utilities)
  - [2. Extract Function - Server Resolvers](#1-extract-function---server-resolvers)
  - [3. Simplify Conditional Expressions](#3-simplify-conditional-expressions)
  - [4. Extract API Client Class](#4-extract-api-client-class)

- [Notes](#notes)

## Refactorings

### 1. Extract Function - Favorites Utilities

**Location:** `client/src/App.tsx` - Favorites management logic

**Technique:** Extract Function

**Problem (Before):**
Favorites management logic (localStorage persistence, state updates, toggle logic) was embedded directly in the `App` component. This mixed concerns and made the component harder to read.

**Solution (After):**
Extracted localStorage operations into pure utility functions, keeping state management in the component but separating storage concerns:

- `loadFavoritesFromStorage()` - Handles reading from localStorage
- `saveFavoritesToStorage()` - Handles writing to localStorage
- State and toggle logic remain in component but use the utilities

**Benefits:**

- App component is cleaner and more focused
- Storage operations are testable in isolation (pure functions)
- Better separation of concerns (storage vs. state management)
- Utilities can be reused elsewhere without React dependencies

---

### 2. Extract Function - Server Resolvers

**Location:** `server/resolvers.js` - `getParks` resolver

**Technique:** Extract Function

**Problem (Before):**
The `getParks` resolver had mixed concerns: API fetching, data filtering, and pagination logic.

**Solution (After):**
Extracted focused functions for filtering and pagination:

- API calls are handled by `npsApiClient.fetchParks()` (see [Extract API Client Class](#3-extract-api-client-class) for details)
- `filterParksBySearchTerm()` - Contains all search/filter logic
- `paginateParks()` - Handles pagination logic

**Benefits:**

- Each function has a single responsibility
- Functions can be tested independently
- Easier to understand the data flow
- Reusable functions for other resolvers

---

### 3. Simplify Conditional Expressions

**Location:** `server/resolvers.js` - `getParks` filtering and pagination

**Technique:** Simplify Conditional Expressions / Introduce Explaining Variable

**Problem (Before):**
The conditional logic for handling search vs. non-search cases was nested.

**Solution (After):**

- Extracted filtering and pagination into separate steps
- Used ternary operators for clear conditional assignment
- Introduced explaining variables for complex boolean logic
- Single return statement with clear structure

**Benefits:**

- Single return point makes flow easier to follow
- Clear separation between filtering and pagination steps
- Explaining variables make boolean logic readable
- Less nesting improves readability

---

### 4. Extract API Client Class

**Location:** `server/resolvers.js` - API calls throughout

**Technique:** Extract Class

**Problem (Before):**
API calls were scattered throughout the resolvers with duplicated code.

**Solution (After):**
Created a `NPSApiClient` class that encapsulates:

- API key management
- Base URL configuration
- Consistent error handling
- Reusable fetch methods

**Benefits:**

- Better organization of API-related code
- Consistent error handling across all API calls
- Simple to add new API methods

---

## Notes

- All refactoring was done incrementally with tests passing after each change to ensure functionality was preserved
- Tests in `server/resolvers.test.js` and `client/src/App.test.tsx` validate the refactored code. For details about testing see:
  - [server/README.md](server/README.md)
  - [client/README.md](client/README.md)
