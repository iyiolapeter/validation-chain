# Validation Chain

Expressive validation through the use of chaining.


## Usage

Install it with `npm install validation-chain`.

Then in your code

```JS
import validation from 'validation-chain';

import { isEmail, minLength, isZero, endsWith } from 'your-favorite-validation-helpers';


const emailValidator = validation()
    .rule( isEmail, 'Must be a valid email address' )
    .required( 'Email is required' );

emailValidator.validate( 'ahasdljwd' )
// -> ['Must be a valid email address']

emailValidator.validate( 'address@host.com' )
// -> []


const passwordValidator = validation()
    .rule( minLength( 5 ), 'Password must have at least 5 characters' )
    .rule( myWeirdPasswordRule, 'Password must have at least one upper case letter, two lower case letter and always end with a number' )
    .required( 'Password is required' );

passwordValidator.validate( '' )
// -> ['Password is required'] : required rules override any other error that could be detected

passwordValidator.validate( 'haha' )
// -> ['Password must have at least 5 characters', 'Password must have at least one upper case letter, two lower case letter and always end with a number']


const cssValidator = validation()
    .oneOf( [isZero, endsWith( 'px' ), endsWith( '%' )], 'Must be 0, end with px or end with %' );

cssValidator.validate( '0' )
cssValidator.validate( '10px' )
cssValidator.validate( '50%' )
// -> []
```


## Listing rules

You can chain as many rules as you want before running validate. Right now you can have three kinds of operations:
- `rule( predicate, message )`: will try the value with the given predicate and return the message if it is not valid.
- `oneOf( [predicates], message )`: will return the message only if none of the predicate match the value.
- `required( message )`: will be tried first and if the value is empty, only this message will be shown.


## Extending validators

You can create new validators based on other existing one like this:

```JS
const validator         = validation().rule( /* RULE 1 */ );
const extendedValidator = validation( validator ).rule( /* RULE 2 */ );

// the following will try RULE 1 and RULE 2 on value
extendedValidator.validate( value )
```

