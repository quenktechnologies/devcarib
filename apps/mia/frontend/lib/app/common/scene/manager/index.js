"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandlers = exports.MiaManager = void 0;
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const form_1 = require("@quenk/jouvert/lib/app/scene/form");
const __1 = require("../");
/**
 * MiaManager is the base class for data management style views within the Mia
 * application.
 *
 * MiaManagers show data loaded from the server in a table. Most provide the
 * same functionality including search.
 */
class MiaManager extends __1.MiaScene {
    receive() {
        return [
            new form_1.FormSavedCase(this),
            ...super.receive()
        ];
    }
    /**
     * search the server for data that matches the specified query criteria.
     *
     * Handling of the found data is expected to occur in the installed
     * CompleteHandlers.
     */
    search(qry) {
        return this.model.search(qry);
    }
    /**
     * afterFormSaved callback that will effectively reload the view after
     * the user saves new data.
     *
     * @override
     */
    afterFormSaved() {
        return this.search({}).map(() => { });
    }
    run() {
        return this.search({});
    }
}
exports.MiaManager = MiaManager;
const defaultHandlers = (mgr) => [
    new handlers_1.AfterSearchSetData(data => { mgr.values.table.data = data; }),
    new handlers_1.AfterSearchSetPagination(mgr.values.table),
    new handlers_1.ShiftingOnComplete([
        new handlers_1.OnCompleteShowData(mgr),
        new handlers_1.AfterSearchUpdateWidget(mgr.view, mgr.values.table.id)
    ])
];
exports.defaultHandlers = defaultHandlers;
//# sourceMappingURL=index.js.map