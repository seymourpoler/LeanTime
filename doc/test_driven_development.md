# Test Driven Development (TDD)

## What is TDD?
Test Driven Development (TDD) is a software development methodology where you write automated tests for features or fixes before writing the code that makes them pass. This ensures your code is dependable, testable, and designed from the start to meet its requirements.

## The TDD Cycle (Red-Green-Refactor)
1. **Red:** Write a test for a new behavior. Run it—it should fail (since the feature doesn't exist yet).
2. **Green:** Implement just enough code so that the test passes. Avoid overengineering.
3. **Refactor:** Clean up the code, improve structure or readability, and ensure all tests still pass.

Repeat this loop for each new feature, bugfix, or refactor opportunity!

## Why use TDD?
- **Better design:** Forces you to clarify requirements and interface design up front.
- **Confidence:** You always have a set of passing tests to catch regressions.
- **Refactoring safety:** Fearlessly improve code, knowing tests will catch mistakes.
- **Less debugging:** Tests help catch errors early, close to where they're introduced.

## TDD with LeanTime
LeanTime’s codebase, both client and server, is structured for easy unit testing (see Presenter/Service/View for example). Using TDD:
- Write or extend a Vitest test before every new feature or logic tweak.
- Only write enough implementation to make the new test pass.
- Refactor for clarity and idiomatic code once tests are green.

### Example TDD sequence
1. Add a test in `src/client/presenter.test.ts` for a UI behavior (e.g., pausing timer resets sound).
2. Run tests—fail.
3. Implement logic in `presenter.ts`.
4. Run tests—pass.
5. Refactor `presenter.ts` or `view.ts` for readability.

## Further reading
- [Test Driven Development: By Example (book, Kent Beck)](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [What is TDD? (Martin Fowler)](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Vitest guides (LeanTime’s test runner)](https://vitest.dev/guide/)

---
Practicing TDD keeps LeanTime code robust, testable, and easier to extend!