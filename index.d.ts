/**
 * @license
 * Copyright OpenINF All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://open.inf.is/license
 */
/**
 * An invalid or unsupported value was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1121-L1128
 */
export declare class InvalidArgValueError extends TypeError {
    code: string;
    /**
     * @param {string} name The argument name.
     * @param {unknown} value The argument value.
     * @param {string} reason The reason for invalidity.
     */
    constructor(name: string, value: unknown, reason?: string);
}
/**
 * An argument of the wrong type was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1014-L1120
 */
export declare class InvalidArgTypeError extends TypeError {
    code: string;
    /**
     * @param {string} argName The argument name.
     * @param {!(Array<string> | string)} expected The argument type(s) expected.
     * @param {unknown} actual The actual argument.
     */
    constructor(argName: string, expected: (string[] | string), actual: unknown);
}
/**
 * An invalid or unsupported value for an object property.
 */
export declare class InvalidPropertyValueError extends TypeError {
    code: string;
    /**
     * @param {string} objName The object name.
     * @param {string} propName The property name.
     * @param {unknown} propValue The property value.
     */
    constructor(objName: string, propName: string, propValue: unknown);
}
/**
 * An invalid or unsupported type for an object property.
 */
export declare class InvalidPropertyTypeError extends TypeError {
    code: string;
    /**
     * @param {string} objName The object name.
     * @param {string} propName The property name.
     * @param {!(Array<string> | string)} expected The property type(s) expected.
     * @param {string} actual The actual property.
     */
    constructor(objName: string, propName: string, expected: (string[] | string), actual: string);
}
/**
 * The number of arguments passed to a function is invalid.
 */
export declare class InvalidArgsNumberError extends TypeError {
    code: string;
    /**
     * @param {string} funcName The function name.
     * @param {number} expected The number of arguments expected to be passed.
     * @param {string} actual The actual number of arguments passed.
     */
    constructor(funcName: string, expected: number, actual: string);
}
/**
 * For APIs that accept options objects, some options might be mandatory. This
 * error is thrown if a required option is missing.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_OPTION
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1294
 */
export declare class MissingOptionError extends TypeError {
    code: string;
    /** @param {string} optName The missing option name. */
    constructor(optName: string);
}
/**
 * Thrown in case a function option does not provide a valid value for one of
 * its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1187-L1190
 */
export declare class InvalidReturnPropertyValueError extends TypeError {
    code: string;
    /**
     * @param {string} input The type of the invalid value.
     * @param {string} name The name of the function that returned the value.
     * @param {string} prop The property name of the invalid value.
     * @param {unknown} value The actual invalid value.
     */
    constructor(input: string, name: string, prop: string, value: unknown);
}
/**
 * Thrown in case a function option does not provide an expected value type for
 * one of its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1191-L1200
 */
export declare class InvalidReturnPropertyTypeError extends TypeError {
    code: string;
    /**
     * @param {string} input The type of the invalid value.
     * @param {string} name The name of the function that returned the value.
     * @param {string} prop The property name of the invalid value.
     * @param {unknown} value The actual invalid value.
     */
    constructor(input: string, name: string, prop: string, value: unknown);
}
/**
 * Thrown in case a function option does not return an expected valid value on
 * execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
export declare class InvalidReturnValueError extends TypeError {
    code: string;
    /**
     * @param {string} input The type of the invalid value.
     * @param {string} name The name of the function that returned the value.
     * @param {unknown} value The actual invalid value.
     */
    constructor(input: string, name: string, value: unknown);
}
/**
 * Thrown in case a function option does not return an expected value type on
 * execution, such as when a function is expected to return a promise.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
export declare class InvalidReturnTypeError extends TypeError {
    code: string;
    /**
     * @param {string} input The type of the invalid value.
     * @param {string} name The name of the function that returned the value.
     * @param {unknown} value The actual invalid value.
     */
    constructor(input: string, name: string, value: unknown);
}
/**
 * A required argument of a Node.js API was not passed. This is only used for
 * strict compliance with the API specification (which in some cases may accept
 * `func(undefined)` but not `func()`). In most native Node.js APIs,
 * `func(undefined)` and `func()` are treated identically, and the
 * `ERR_INVALID_ARG_TYPE` error code may be used instead.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_ARGS
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1268-L1293
 */
export declare class MissingArgsError extends TypeError {
    code: string;
    /** @param {Array<string>} args The missing argument names. */
    constructor(...args: string[]);
}
/**
 * An unhandled error occurred (for instance, when an 'error' event is emitted
 * by an EventEmitter but an 'error' handler is not registered).
 * @see https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1454-L1461
 */
export declare class UnhandledErrorError extends Error {
    code: string;
    constructor(err?: (string | undefined));
}
