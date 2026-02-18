# TDD (Test Driven Development) Rules

## 1. Core Philosophy (Red-Green-Refactor)

Follow the strict cycle for every new feature or bug fix:

1.  **Red (Write a Failing Test)**:
    - Write a test case that describes the expected behavior.
    - Run the test and confirm it fails (compilation error or assertion failure).
2.  **Green (Make it Pass)**:
    - Write the _minimum_ amount of code necessary to pass the test.
    - Do not optimize or over-engineer at this stage.
3.  **Refactor (Improve)**:
    - Clean up the code (remove duplication, improve naming) while ensuring tests still pass.

## 2. Testing Stack & Standards

- **Framework**: Jest (`*.test.ts`, `*.test.tsx`)
- **Location**: Place tests in `src/__tests__/` directory.
- **Naming Convention**: `[filename].test.ts`

## 3. Test Structure

Use the standard `describe-it-expect` pattern:

```typescript
describe("Feature or Function Name", () => {
  // Setup (optional)
  beforeEach(() => {
    // Reset state/mocks
  });

  it("should describe expected behavior", () => {
    // Arrange
    const input = ...;

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

## 4. Best Practices

- **Test Behavior, Not Implementation**: Verify inputs and outputs, not internal state.
- **Isolation**: Tests should not depend on each other. Use `beforeEach` to reset state.
- **Descriptive Names**: Test names should read like documentation (e.g., "should throw error when email is invalid").
- **Mocking**: Mock external dependencies (DB, API) to focus on the unit under test.
