"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearExpiredJobs = exports.clock = void 0;
const clear_expired_jobs_1 = require("./clear-expired-jobs");
const clock_1 = require("./clock");
exports.clock = {
    id: 'clock',
    create: (s) => clock_1.TaskClock.create(s, 1000)
};
exports.clearExpiredJobs = {
    id: 'clearExpiredJobs',
    create: (s) => new clear_expired_jobs_1.ClearExpiredJobsTask(s)
};
//# sourceMappingURL=index.js.map