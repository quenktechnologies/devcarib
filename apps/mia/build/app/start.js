"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@quenk/tendril/lib/app");
const _1 = require("./");
let app = new app_1.App(_1.template);
app.start().fork(e => { throw e; }, () => { });
//# sourceMappingURL=start.js.map