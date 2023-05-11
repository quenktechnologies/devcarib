"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policiesAvailable = void 0;
const job_1 = require("./job");
const mail_message_1 = require("./mail-message");
/**
 * policiesAvailable is a map of model names to search filter policies that can
 * be used in an application.
 */
exports.policiesAvailable = {
    'job': job_1.default,
    'mailMessage': mail_message_1.default
};
//# sourceMappingURL=index.js.map