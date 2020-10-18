# Checks

This provides a module that generates preconditions for checks using 
the [@quenk/dagen][1] tool.

Use these preconditions to ensure your valid data is fit for intended purpose.

This module generates a module for each of the data models defined in your
projects's $PROJECT_SCHEMA_DIR/models folder. 

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

[1]: https://github.com/quenktechnologies/dagen
