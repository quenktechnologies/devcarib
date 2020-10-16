"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
//@ts-ignore: 6133
var preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
var number_1 = require("@quenk/preconditions/lib/number");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
//@ts-ignore: 6133
var _title = 'Admin';
//@ts-ignore: 6133
var _record = record_1.intersect;
exports.validate = preconditions_1.and(record_1.isRecord, _record({
    'id': number_1.toNumber,
    'name': string_1.isString,
    'email': string_1.isString,
    'password': string_1.isString
}));
//# sourceMappingURL=admin.js.map