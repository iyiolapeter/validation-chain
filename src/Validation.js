import { rule, oneOf, required, isOK, runOperations } from './operations';


export default class Validation
{
    constructor( base )
    {
        // if another validator is used as parameter, copy its rules
        this.operations    = base ? [...base.operations] : [];
        this.reqOperations = base ? [...base.reqOperations] : [];
    }


    chain( operation, ...params )
    {
        this.operations.push( { operation, params } );
        return this;
    }


    reqChain( operation, ...params )
    {
        this.reqOperations.push( { operation, params } );
        return this;
    }


    rule( predicate, message )
    {
        return this.chain( rule, predicate, message );
    }


    oneOf( predicates, message )
    {
        return this.chain( oneOf, predicates, message );
    }


    required( message )
    {
        return this.reqChain( required, message );
    }


    validate = ( value ) =>
    {
        // check for required operations
        const reqErrors = runOperations( this.reqOperations, value );

        // if no req error was found, run the other operations
        return ( isOK( value ) && reqErrors.length === 0 )
            ? runOperations( this.operations, value )
            : reqErrors;
    }
}

