"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("@quenk/tendril/lib/app");
var _1 = require("./");
var app = new app_1.App(_1.template);
app.start().fork(function (e) { throw e; }, function () { });
//# sourceMappingURL=start.js.map