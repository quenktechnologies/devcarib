"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@quenk/safe-mongodb/lib/database/collection");
const response_1 = require("@quenk/tendril/lib/app/api/action/response");
const control_1 = require("@quenk/tendril/lib/app/api/action/control");
const pool_1 = require("@quenk/tendril/lib/app/api/action/pool");
const monad_1 = require("@quenk/noni/lib/control/monad");
const type_1 = require("@quenk/noni/lib/data/type");
/**
 * showForm displays the employer regisration form.
 */
exports.showForm = (_) => response_1.show('employer/registration/form.html', {});
/**
 *   createEmployer creates the employer after registration.
*/
exports.createEmployer = (r) => monad_1.doN(function* () {
    if (type_1.isObject(r.body)) {
        let data = r.body;
        let db = yield pool_1.checkout('main');
        let collection = db.collection('employers');
        yield control_1.await(() => collection_1.insertOne(collection, data));
        return response_1.redirect('/dashboard', 302);
    }
    else {
        return response_1.redirect('/', 302);
    }
});
//# sourceMappingURL=handlers.js.map