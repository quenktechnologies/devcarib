"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
/**
 * Comment policies
 * AUTO_GENERATED! DO NOT EDIT DIRECTLY!
 */
exports.Comment = {
    'id': [
        'number',
        'numbers'
    ],
    'post': [
        'number',
        'numbers'
    ],
    'created_by.id': [
        'number',
        'numbers'
    ],
    'created_by.username': 'matchci',
    'created_on': 'date',
    'last_updated_on': 'date',
    'last_updated_by.id': [
        'number',
        'numbers'
    ],
    'last_updated_by.username': 'matchci',
};
exports.default = exports.Comment;
//# sourceMappingURL=comment.js.map