const { escapeIdentifier } = require('pg');

function validateQueryAttribute ( value, fallbackValue ) {
    return escapeIdentifier( value ?? fallbackValue );
};

function validateQuerySortOrder ( value ) {
    const result = (value ?? 'ASC').toUpperCase();
    return (result === 'ASC' || result === 'DESC') ? result : 'ASC';
};

module.exports = { validateQueryAttribute, validateQuerySortOrder };