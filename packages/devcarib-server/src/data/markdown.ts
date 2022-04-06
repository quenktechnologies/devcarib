import * as marked from 'marked';
import * as sanitize from 'sanitize-html';

/**
 * CommonMark is a string containing common marked text.
 */
export type CommonMark = string;

/**
 * HTML is a string created from the parsed marked text.
 */
export type HTML = string;

/**
 * parse a string treating it as CommonMark giving the result back as HTML.
 */
export const parse = (src: CommonMark) : HTML => {

    let raw = marked.parse(String(src), { breaks: true, gfm: true });

    return sanitize(raw, {

        allowedTags: [
            'b', 'i', 'em', 'strong', 'p', 'h1', 'h2', 'h3', 'h4', 'h5',
            'h6', 'div', 'span', 'ul', 'ol', 'li', 'blockquote', 'hr'
        ],
        allowedAttributes: {}

    });

}
