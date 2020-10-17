# Valdation

This provides a module that generates preconditions for validation using 
the [@quenk/dagen][1] tool.

Validation is about ensuring the data provided to our application is valid
for its declared type. Validation is not about ensuring data is fit for purpose,
that should be done at the verification or check phase.

This module generates a module for each of the data models defined in your
projects's $SCHEMA_DIR/models. The generated module has a structure that looks
like the following:

```typescript
// A map of Preconditions that should be used to validate new data.
export declare const validators: Preconditions<Value, Value>;

// A map of Preconditons that should be used to validate partial data.
export declare const partialValidators: Preconditions<Value, Value>;

// A Precondition encompassing validators.
export declare const validate: Precondition<Value, T>;

// A Precondition encompassing partialValidators.
export declare const validatePartial: Precondition<Value, Partial<T>>;
```

## Tests

Tests are also generated as long as `document.test.disable` is not set to true.
The tests check four things, valid data, invalid data, data below the lower 
bounds and data above the upper bounds.

This is done for both full and partial data. The data for the testing must
be provided by users in the `test/fixtures/data` folder. Each file should be
named after the data model targeted and have the following format:

```typescript
export declare const valid = () => Object;

export declare const invalid = () => Object;

export declare const lower = () => Object;

export declare const upper = () => Object;

export declare const expected = { [key: string]: Object };
```

The `expected` export is an object that must have a valid,invalid,lower and
upper property. These are used in the tests.

[1]: https://github.com/quenktechnologies/dagen
