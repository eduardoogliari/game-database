const { escapeIdentifier } = require('pg');

export function validateQueryAttribute( value : string, fallbackValue : string ) : string {
    return escapeIdentifier( value ?? fallbackValue );
};

export function validateQuerySortOrder( value : string ) : string {
    const result = (value ?? 'ASC').toUpperCase();
    return (result === 'ASC' || result === 'DESC') ? result : 'ASC';
};

// module.exports = { validateQueryAttribute, validateQuerySortOrder };