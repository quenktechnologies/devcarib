"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearExpiredJobs = void 0;
const clear_expired_jobs_1 = require("@board/server/lib/actors/tasks/clear-expired-jobs");
exports.clearExpiredJobs = {
    id: 'clearExpiredJobs',
    create: (s) => new clear_expired_jobs_1.ClearExpiredJobsTask(s)
};
//# sourceMappingURL=tasks.js.map