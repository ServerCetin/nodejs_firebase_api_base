exports.FilterExpression = {
    "lower": '<',
    "lowerEqual": '<=',
    "equal": '==',
    "notEqual": "!=",
    "greater": ">",
    "greaterEqual": ">=",
    "arrayContains": "array-contains",
    "in": "in",
    "notIn": "not-in",
    "arrayContainsAny": "array-contains-any"
}

exports.filterUnit = (filterKey, filterExpression, filterValue) => {
    return {
        key: filterKey,
        expression: filterExpression,
        value: filterValue
    }
}

exports.APIFeatureQuery = {
    filter: null,
    // sort: null, // string, separate with comma
    paginate: {
        startingIndex: null,
        limit: 100,
    }
}