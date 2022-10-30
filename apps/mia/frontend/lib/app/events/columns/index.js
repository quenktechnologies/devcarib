"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionColumn = exports.HostColumn = exports.EndColumn = exports.StartColumn = exports.TitleColumn = void 0;
const moment = require("moment");
const views_1 = require("./views");
/**
 * TitleColumn displays the title of the event.
 */
class TitleColumn {
    constructor(action) {
        this.action = action;
        this.name = 'title';
        this.heading = 'Title';
        this.cellFragment = (c) => new views_1.TitleColumnView({
            event: c.datum,
            onClick: () => this.action(c.datum)
        });
    }
}
exports.TitleColumn = TitleColumn;
/**
 * StartColumn
 */
class StartColumn {
    constructor() {
        this.name = 'startDateTime';
        this.heading = 'Start';
        this.format = (val) => moment(val).calendar();
        this.sort = 'start';
    }
}
exports.StartColumn = StartColumn;
/**
 * EndColumn
 */
class EndColumn {
    constructor() {
        this.name = 'endDateTime';
        this.heading = 'End';
        this.format = (val) => val ? moment(val).calendar() : '';
        this.sort = 'event';
    }
}
exports.EndColumn = EndColumn;
/**
 * HostColumn
 */
class HostColumn {
    constructor() {
        this.name = 'host';
        this.heading = 'Host';
    }
}
exports.HostColumn = HostColumn;
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single event.
 */
class ActionColumn {
    constructor(actions) {
        this.actions = actions;
        this.name = '';
        this.heading = 'Actions';
        this.cellFragment = (c) => new views_1.ActionColumnView({
            actions: this.actions,
            event: c.datum
        });
    }
}
exports.ActionColumn = ActionColumn;
//# sourceMappingURL=index.js.map