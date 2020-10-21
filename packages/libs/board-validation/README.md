# Validation

This provides a module that generates preconditions for validation using 
the [@quenk/dagen][1] tool.

Validation is about ensuring the data provided to our application is valid
for its declared type. Validation is not about ensuring data is fit for purpose,
that should be done at the verification or check phase.

This module generates a module for each of the data models defined in your
project's $SCHEMA_DIR/models using the "validation" property.

The syntax of that property is one of the following:

```json
{

"validation": "@quenk/validation#myCheck"

"validation": ["@quenk/validation#myCheckWithArgs", [1, "'two'", true]],

"validation": [
  
  "@quenk/validation#myCheck"

  ["@quenk/validation#myCheckWithArgs", [1, "'two'", true]],

]

}

```

The first example references a single validator using module pointer syntax.
The second references a function that accepts three arguments to provide the
validator and the final indicates how to specify multiple validators which will
all be AND'd together.

The generated module has a structure that looks like the following:

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

Tests are also generated as long as `document.test.disabled` is not set to true.
The test template generates a script that generates tests at runtime based
on the `TestSuite` interface defined in `test/fixtures/test`.

For each data model a validation file is generated for, you should have a 
corresponding file in `test/fixtures.data` that exports two `TestSuite`s.

One named `complete` and one named `partial. There is a sample provided to get
you started but you can just do `export const complete = {}` etc. if you need
to skip writing the tests for now.

[1]: https://github.com/quenktechnologies/dagen
