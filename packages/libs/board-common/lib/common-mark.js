"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var marked = require("marked");
var sanitize = require("sanitize-html");
/**
 * parse a string treating it as CommonMark giving the result back as HTML.
 */
exports.parse = function (src) {
    var raw = marked(String(src), { breaks: true, gfm: true });
    return sanitize(raw, {
        allowedTags: [
            'b', 'i', 'em', 'strong', 'p', 'h1', 'h2', 'h3', 'h4', 'h5',
            'h6', 'div', 'span', 'ul', 'ol', 'li', 'blockquote', 'hr'
        ],
        allowedAttributes: {}
    });
};
//# sourceMappingURL=common-mark.js.map