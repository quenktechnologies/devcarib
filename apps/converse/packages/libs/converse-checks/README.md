# Checks

This provides a module that generates preconditions for checks using 
the [@quenk/dagen][1] tool.

Use these preconditions to ensure your valid data is fit for intended purpose.

This module generates a module for each of the data models defined in your
projects's $PROJECT_SCHEMA_DIR/models folder using the "checks" property.

The syntax of that property is one of the following:

```json
{

"checks": "@quenk/checks#myCheck"

"checks": ["@quenk/checks#myCheckWithArgs", [1, "'two'", true]],

"checks": [
  
  "@quenk/checks#myCheck"

  ["@quenk/checks#myCheckWithArgs", [1, "'two'", true]],

]

}

```

The first example references a single check using module pointer syntax.
The second references a function that accepts three arguments to provide the
check and the final indicates how to specify multiple checks which will all
be AND'd together.

The generated module has a structure that looks like the following:

```typescript
// A map of Preconditions that should be used to check new data.
export declare const checks: Preconditions<Value, Value>;

// A map of Preconditons that should be used to check partial data.
export declare const partialChecks: Preconditions<Value, Value>;

// A Precondition encompassing `checks`.
export declare const check: Precondition<Value, T>;

// A Precondition encompassing `partialChecks`.
export declare const checksPartial: Precondition<Value, Partial<T>>;
```

## Declaring Checks Selectively

Checks can be declared for any data, complete data only or partial data only.
Use the "checks" property to always apply a check(s), use "checks-complete"
for complete data and "checks-partial" for partial data.

[1]: https://github.com/quenktechnologies/dagen
