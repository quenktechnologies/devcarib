"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBoard = void 0;
const response_1 = require("@quenk/tendril/lib/app/api/response");
const showBoard = (_) => (0, response_1.redirect)('/board', 301);
exports.showBoard = showBoard;
//# sourceMappingURL=handlers.js.map