/**
 * CommonMark is a string containing common marked text.
 */
export declare type CommonMark = string;
/**
 * HTML is a string created from the parsed marked text.
 */
export declare type HTML = string;
/**
 * parse a string treating it as CommonMark giving the result back as HTML.
 */
export declare const parse: (src: CommonMark) => HTML;
