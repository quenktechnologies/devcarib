"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
//@ts-ignore: 6133
var preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
//@ts-ignore: 6133
var _title = 'Post';
//@ts-ignore: 6133
var _collection = 'posts';
//@ts-ignore: 6133
var _record = record_1.intersect;
exports.validate = preconditions_1.and(record_1.isRecord, _record({
    'title': string_1.isString,
    'description': string_1.isString,
    'company': string_1.isString,
    'company_email': string_1.isString,
    'company_logo': preconditions_1.optional(string_1.isString),
    'apply_url': preconditions_1.optional(string_1.isString),
}));
//# sourceMappingURL=post.js.map