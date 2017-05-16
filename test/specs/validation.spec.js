import test from 'ava';

import validation from '../../src';


const isBiggerThan  = num => value => value > num;
const isSmallerThan = num => value => value < num;


test( 'Validation with no rules gives no error', t =>
{
    const validator = validation();
    const result    = validator.validate( 0 );

    t.deepEqual( result, [] );
} );


test( 'Validation with one rule', t =>
{
    const validator = validation()
        .rule( isBiggerThan( 1 ), 'Must be bigger than one' );

    const result0 = validator.validate( 0 );
    const result2 = validator.validate( 2 );

    t.deepEqual( result0, ['Must be bigger than one'] );
    t.deepEqual( result2, [] );
} );


test( 'Validation with one of two rules', t =>
{
    const validator = validation()
        .oneOf( [isSmallerThan( 1 ), isBiggerThan( 5 )], 'Must be smaller than one or bigger than five' );

    const result0 = validator.validate( 0 );
    const result3 = validator.validate( 3 );
    const result6 = validator.validate( 6 );

    t.deepEqual( result0, [] );
    t.deepEqual( result3, ['Must be smaller than one or bigger than five'] );
    t.deepEqual( result6, [] );
} );


test( 'Validation with two rules', t =>
{
    const validator = validation()
        .rule( isBiggerThan( 1 ), 'Must be bigger than one' )
        .rule( isBiggerThan( 2 ), 'Must be bigger than two' );

    const result1 = validator.validate( 1 );
    const result2 = validator.validate( 2 );
    const result3 = validator.validate( 3 );

    t.deepEqual( result1, ['Must be bigger than one', 'Must be bigger than two'] );
    t.deepEqual( result2, ['Must be bigger than two'] );
    t.deepEqual( result3, [] );
} );


test( 'Validation with one required rule and a normal one', t =>
{
    const validator = validation()
        .rule( isBiggerThan( 1 ), 'Must be bigger than one' )
        .required( 'Is required' );

    const resultEmpty     = validator.validate( '' );
    const resultNull      = validator.validate( null );
    const resultUndefined = validator.validate( undefined );

    t.deepEqual( resultEmpty, ['Is required'] );
    t.deepEqual( resultNull, ['Is required'] );
    t.deepEqual( resultUndefined, ['Is required'] );

    const result0 = validator.validate( 0 );
    const result1 = validator.validate( 1 );
    const result2 = validator.validate( 2 );

    t.deepEqual( result0, ['Must be bigger than one'] );
    t.deepEqual( result1, ['Must be bigger than one'] );
    t.deepEqual( result2, [] );
} );


test( 'Create new validator based on another one', t =>
{
    const validator = validation()
        .rule( isBiggerThan( 1 ), 'Must be bigger than one' )

    const newValidator = validation( validator )
        .rule( isBiggerThan( 2 ), 'Must be bigger than two' )
        .required( 'Is required' );

    const resultEmpty = newValidator.validate( '' );
    const result0     = newValidator.validate( 0 );
    const result3     = newValidator.validate( 3 );

    t.deepEqual( resultEmpty, ['Is required'] );
    t.deepEqual( result0, ['Must be bigger than one', 'Must be bigger than two'] );
    t.deepEqual( result3, [] );
} );
