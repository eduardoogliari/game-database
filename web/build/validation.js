"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryAttribute = validateQueryAttribute;
exports.validateQuerySortOrder = validateQuerySortOrder;
const { escapeIdentifier } = require('pg');
function validateQueryAttribute(value, fallbackValue) {
    return escapeIdentifier(value !== null && value !== void 0 ? value : fallbackValue);
}
;
function validateQuerySortOrder(value) {
    const result = (value !== null && value !== void 0 ? value : 'ASC').toUpperCase();
    return (result === 'ASC' || result === 'DESC') ? result : 'ASC';
}
;
// module.exports = { validateQueryAttribute, validateQuerySortOrder };
//# sourceMappingURL=validation.js.map