/**
 * CommonMark is a string containing common marked text.
 */
export type CommonMark = string;
/**
 * HTML is a string created from the parsed marked text.
 */
export type HTML = string;
export interface ParseOptions {
    /**
     * allowLinks if true, will keep anchor tags.
     */
    allowLinks?: boolean;
}
/**
 * parse a string treating it as CommonMark giving the result back as HTML.
 */
export declare const parse: (src: CommonMark, options?: ParseOptions) => HTML;
