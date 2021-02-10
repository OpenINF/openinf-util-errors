/**
 * Thrown in case an invalid or unsupported value was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE
 */
export declare class InvalidArgValueError extends TypeError {
    code: string;
    /**
     * @param {string} argName The argument name.
     * @param {unknown} value The actual invalid argument value.
     * @param {string} reason The reason for invalidity.
     */
    constructor(argName: string, value: unknown, reason?: string);
}
/**
 * Thrown in case an argument of the wrong type was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE
 */
export declare class InvalidArgTypeError extends TypeError {
    code: string;
    /**
     * @param {string} argName The name of the argument of invalid type.
     * @param {!(Array<string> | string)} expected The argument type(s) expected.
     * @param {unknown} value The actual argument value of invalid type.
     */
    constructor(argName: string, expected: (string[] | string), value: unknown);
}
/**
 * Thrown in case an invalid or unsupported value of an object property.
 */
export declare class InvalidPropertyValueError extends TypeError {
    code: string;
    /**
     * @param {string} objName The name of the object in question.
     * @param {string} propName The property name assigned invalid value.
     * @param {unknown} value The actual invalid property value assigned.
     * @param {string} reason The reason for invalidity.
     */
    constructor(objName: string, propName: string, value: unknown, reason?: string);
}
/**
 * Thrown in case an invalid or unsupported value type for an object property.
 */
export declare class InvalidPropertyTypeError extends TypeError {
    code: string;
    /**
     * @param {string} objName The name of the object in question.
     * @param {string} propName The property name assigned value of invalid type.
     * @param {!(Array<string> | string)} expected The property type(s) expected.
     * @param {unknown} value The actual property value of invalid type assigned.
     */
    constructor(objName: string, propName: string, expected: (string[] | string), value: unknown);
}
/**
 * Thrown in case a function does not provide a valid value for one of
 * its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY
 */
export declare class InvalidReturnPropertyValueError extends TypeError {
    code: string;
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {string} propName The property name assigned the invalid value.
     * @param {unknown} value The actual invalid property value assigned.
     * @param {string} reason The reason for invalidity.
     */
    constructor(funcName: string, propName: string, value: unknown, reason?: string);
}
/**
 * Thrown in case a function does not provide an expected value type for
 * one of its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE
 */
export declare class InvalidReturnPropertyTypeError extends TypeError {
    code: string;
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {string} propName The property name assigned value of invalid type.
     * @param {!(Array<string> | string)} expected The property type(s) expected.
     * @param {unknown} value The actual property value of invalid type assigned.
     */
    constructor(funcName: string, propName: string, expected: (string[] | string), value: unknown);
}
/**
 * Thrown in case a function does not return an expected valid value on
 * execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 */
export declare class InvalidReturnValueError extends TypeError {
    code: string;
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {unknown} value The actual invalid value returned.
     * @param {string} reason The reason for invalidity.
     */
    constructor(input: string, funcName: string, value: unknown, reason: string);
}
/**
 * Thrown in case a function does not return an expected value type on
 * execution, such as when a function is expected to return a promise.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 */
export declare class InvalidReturnTypeError extends TypeError {
    code: string;
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {!(Array<string> | string)} expected The return type(s) expected.
     * @param {unknown} value The actual value of invalid type returned.
     */
    constructor(input: string, funcName: string, expected: (string[] | string), value: unknown);
}
/**
 * Thrown in case the number of arguments passed to a function is invalid.
 */
export declare class InvalidArgsNumberError extends TypeError {
    code: string;
    /**
     * @param {string} funcName The name of the function in question.
     * @param {number} expected The number of arguments expected to be passed.
     * @param {number} value The actual number of arguments passed.
     */
    constructor(funcName: string, expected: number, value: number);
}
/**
 * For APIs that accept options objects, some options might be mandatory. This
 * error is thrown if a required option is missing.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_OPTION
 */
export declare class MissingOptionError extends TypeError {
    code: string;
    /** @param {string} optName The name of the missing option. */
    constructor(optName: string);
}
/**
 * Thrown in case a required argument of an API was not passed.
 *
 * This is only used for strict compliance with the API specification (which in
 * some cases may accept `func(undefined)` but not `func()`). In most native
 * Node.js APIs, `func(undefined)` and `func()` are treated identically, and the
 * `ERR_INVALID_ARG_TYPE` error code may be used instead.
 *
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_ARGS
 */
export declare class MissingArgsError extends TypeError {
    code: string;
    /** @param {Array<string>} args The names of the missing arguments. */
    constructor(...args: string[]);
}
/**
 * Thrown in case an unhandled error occurred (for instance, when an 'error'
 * event is emitted by an EventEmitter without an 'error' handler registered).
 * @see https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR
 */
export declare class UnhandledErrorError extends Error {
    code: string;
    constructor(err?: (string | undefined));
}
