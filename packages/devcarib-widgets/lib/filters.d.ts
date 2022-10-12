/**
 * timestamp displays a date in the follwing format: "January 30th 2021".
 */
export declare const timestamp: (str?: string) => string;
/**
 * timefromnow displays the distance of a date from the current date.
 */
export declare const timefromnow: (str?: string) => string;
/**
 * truncate a string over the specified limit replacing the rest of the
 * characters with an ellipsis.
 */
export declare const truncate: (limit: number) => (str?: string) => string;
