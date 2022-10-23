/**
 * now produces a JS Date object at the current time in UTC.
 */
export declare const now: () => Date;
/**
 * getOffset provides the TZ offset from the provided Date value or constructs
 * one if not passed.
 *
 * The TZ offset is of the form +00:00.
 */
export declare const getOffset: (date?: Date) => string;
