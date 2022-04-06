"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
window.system = app_1.Converse.create(document.getElementById('main'), document.getElementById('dialogs'));
window.system.run();
//# sourceMappingURL=main.js.map