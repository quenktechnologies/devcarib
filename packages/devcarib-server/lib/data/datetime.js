"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = void 0;
const moment = require("moment");
const now = () => moment.utc().toDate();
exports.now = now;
//# sourceMappingURL=datetime.js.map