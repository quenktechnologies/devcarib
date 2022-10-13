"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedByColumn = exports.UrlColumn = exports.EmailColumn = void 0;
class EmailColumn {
    constructor() {
        this.name = 'email';
        this.heading = 'Email';
    }
}
exports.EmailColumn = EmailColumn;
class UrlColumn {
    constructor() {
        this.name = 'id';
        this.heading = 'Token';
    }
}
exports.UrlColumn = UrlColumn;
class CreatedByColumn {
    constructor() {
        this.name = 'created_by';
        this.heading = 'Invited By';
        this.format = (inv) => inv.created_by;
    }
}
exports.CreatedByColumn = CreatedByColumn;
//# sourceMappingURL=columns.js.map