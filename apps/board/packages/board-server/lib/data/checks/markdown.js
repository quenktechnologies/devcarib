"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const marked = require("marked");
const sanitize = require("sanitize-html");
const tagsAllowed = [
    'b', 'i', 'em', 'strong', 'p', 'h1', 'h2', 'h3', 'h4', 'h5',
    'h6', 'div', 'span', 'ul', 'ol', 'li', 'blockquote', 'hr', 'a'
];
/**
 * parse a string treating it as CommonMark giving the result back as HTML.
 */
const parse = (src, options = {}) => {
    let raw = marked.parse(String(src), { breaks: true, gfm: true });
    let allowedAttributes = options.allowLinks ? { a: ['href'] } : undefined;
    let allowedTags = options.allowLinks ?
        tagsAllowed :
        tagsAllowed.filter(tag => tag !== 'a');
    return sanitize(raw, { allowedTags, allowedAttributes });
};
exports.parse = parse;
//# sourceMappingURL=markdown.js.map