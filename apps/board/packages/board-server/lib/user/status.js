"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusText = exports.statusMap = exports.USER_STATUS_DISABLED = exports.USER_STATUS_ACTIVE = void 0;
exports.USER_STATUS_ACTIVE = 5;
exports.USER_STATUS_DISABLED = 1;
/**
 * statusMap maps a status to text usable for the UI screens.
 */
exports.statusMap = {
    [exports.USER_STATUS_ACTIVE]: 'active',
    [exports.USER_STATUS_DISABLED]: ' disabled'
};
const getStatusText = (status) => exports.statusMap[status] || 'Unknown';
exports.getStatusText = getStatusText;
//# sourceMappingURL=status.js.map