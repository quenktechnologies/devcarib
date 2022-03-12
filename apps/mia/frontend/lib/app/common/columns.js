"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionColumn = void 0;
const columns_1 = require("./columns/views/columns");
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * table entry.
 */
class ActionColumn {
    constructor(actions) {
        this.actions = actions;
        this.name = '';
        this.heading = 'Actions';
        this.cellFragment = (c) => new columns_1.ActionColumnView({
            actions: this.actions,
            data: c.datum
        });
    }
}
exports.ActionColumn = ActionColumn;
//# sourceMappingURL=columns.js.map