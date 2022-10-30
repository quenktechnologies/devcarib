"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetime = exports.rand = exports.parseMarkdown = exports.timestamp = exports.inc = exports.id = exports.unique = exports.bcrypt = exports.COUNTERS_ID = void 0;
const bcryptjs = require("bcryptjs");
const uuid = require("uuid");
const moment = require("moment");
const crypto = require("crypto");
const mark = require("./markdown");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const monad_1 = require("@quenk/noni/lib/control/monad");
const path_1 = require("@quenk/noni/lib/data/record/path");
const type_1 = require("@quenk/noni/lib/data/type");
const connection_1 = require("@quenk/tendril/lib/app/connection");
const result_1 = require("@quenk/preconditions/lib/result");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
exports.COUNTERS_ID = 'counters';
/**
 * bcrypt
 */
const bcrypt = (str) => (0, monad_1.doN)(function* () {
    let salty = yield salt();
    let salted = yield hash(String(str), salty);
    return (0, future_1.pure)((0, result_1.succeed)(salted));
});
exports.bcrypt = bcrypt;
const salt = () => (0, future_1.fromCallback)(cb => bcryptjs.genSalt(12, cb));
const hash = (str, salt) => (0, future_1.fromCallback)(cb => bcryptjs.hash(str, salt, cb));
/**
 * unique fails if the value specified for the field is already stored in the
 * database.
 */
const unique = (collection, field, dbid = 'main') => (value) => (0, monad_1.doN)(function* () {
    let db = yield getMain(dbid);
    let n = yield (0, collection_1.count)(db.collection(collection), {
        [field]: value
    });
    return (0, future_1.pure)((n > 0) ?
        (0, result_1.fail)('unique', value, { value }) :
        (0, result_1.succeed)(value));
});
exports.unique = unique;
/**
 * id generates the id number for a record.
 */
const id = () => (0, future_1.pure)((0, result_1.succeed)(uuid.v4().split('-').join('')));
exports.id = id;
/**
 * inc increments a counter stored in the database returning the value.
 *
 * This is used mostly for generationg sequential ids.
 *
 * Note: This was previously used at the field level but that wastes ids when
 * other checks fail. Instead, it now expects the whole object and will assign
 * the value to the property directly.
 */
const inc = (counter, propName = 'id', dbid = 'main') => (value) => (0, monad_1.doN)(function* () {
    let db = yield getMain(dbid);
    let target = db.collection('counters');
    let filter = { id: exports.COUNTERS_ID };
    let update = { $inc: { [counter]: 1 } };
    let opts = { returnDocument: 'after', upsert: true };
    let mresult = yield (0, collection_1.findOneAndUpdate)(target, filter, update, opts);
    value[propName] = (0, path_1.unsafeGet)(counter, mresult.get());
    return (0, future_1.pure)((0, result_1.succeed)(value));
});
exports.inc = inc;
const getMain = (id) => (0, connection_1.getInstance)().get(id).get().checkout();
/**
 * timestamp provides the current UTC datetime as a Date object.
 */
const timestamp = () => (0, future_1.pure)((0, result_1.succeed)(moment.utc().toDate()));
exports.timestamp = timestamp;
/**
 * parseMarkdown parses the value of a property on a object as markdown
 * and sets the result to the target destination.
 */
const parseMarkdown = (src, dest, allowLinks = false) => (value) => (0, future_1.fromCallback)(cb => {
    if (!(0, type_1.isObject)(value))
        return cb(null, (0, result_1.succeed)(value));
    let val = value;
    if (val[src] == null)
        return cb(null, (0, result_1.succeed)(value));
    val[dest] = mark.parse(String(val[src]), { allowLinks });
    cb(null, (0, result_1.succeed)(val));
});
exports.parseMarkdown = parseMarkdown;
/**
 * rand generates a secure random string using the crypto.randomString()
 * function then sets the property at target to the returned value.
 *
 * By default, we generate 32 bytes.
 */
const rand = (target, bytes = 32) => (value) => (0, future_1.doFuture)(function* () {
    let str = yield (0, future_1.fromCallback)(cb => crypto.randomBytes(bytes, cb));
    value[target] = str.toString('hex');
    return (0, future_1.pure)((0, result_1.succeed)(value));
});
exports.rand = rand;
/**
 * datetime computes a datetime value (returning a Date instance) using the
 * keys provided.
 */
const datetime = (key, dateKey, timeKey, offsetKey) => (value) => (0, future_1.fromCallback)(cb => {
    let date = value[dateKey];
    let time = value[timeKey];
    if (!date || !time) {
        cb(null, (0, result_1.succeed)(value)); // date and time are needed.
    }
    else {
        let offset = value[offsetKey];
        let mValue = moment(`${date}T${time}:00${offset}`);
        if (!mValue.isValid()) {
            cb(null, (0, result_1.fail)(key, value));
        }
        else {
            value[key] = mValue.toDate();
            cb(null, (0, result_1.succeed)(value));
        }
    }
});
exports.datetime = datetime;
//# sourceMappingURL=checks.js.map