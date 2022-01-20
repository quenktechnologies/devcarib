"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// Create and run the app. Note that it will crash if the DOM nodes below are
// missing.
window.system = app_1.Mia.create(document.getElementById('app'), document.getElementById('dialogs'));
window.system.run();
//# sourceMappingURL=main.js.map