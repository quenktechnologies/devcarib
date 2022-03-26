"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const marked = require("marked");
const sanitize = require("sanitize-html");
/**
 * parse a string treating it as CommonMark giving the result back as HTML.
 */
const parse = (src) => {
    let raw = marked(String(src), { breaks: true, gfm: true });
    return sanitize(raw, {
        allowedTags: [
            'b', 'i', 'em', 'strong', 'p', 'h1', 'h2', 'h3', 'h4', 'h5',
            'h6', 'div', 'span', 'ul', 'ol', 'li', 'blockquote', 'hr'
        ],
        allowedAttributes: {}
    });
};
exports.parse = parse;
//# sourceMappingURL=markdown.js.map