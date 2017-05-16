export function isOK( value )
{
    return ( Boolean( value ) || value === 0 );
}


export function rule( predicate, message, value )
{
    return predicate( value )
        ? null
        : message;
}


export function oneOf( predicates, message, value )
{
    // return an error only if none of the predicate match
    return predicates.map( predicate => predicate( value ) ).some( Boolean )
        ? null
        : message;
}


export function required( message, value )
{
    return isOK( value )
        ? null
        : message;
}



export function runOperations( operations, value )
{
    // execute all operations and keep only those which returned a message
    return operations
        .map( ( { operation, params } ) => operation( ...params, value ) )
        .filter( Boolean );
}
