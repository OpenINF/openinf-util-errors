"use strict";
/**
 * @license
 * Copyright OpenINF All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://open.inf.is/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnhandledErrorError = exports.MissingArgsError = exports.MissingOptionError = exports.InvalidArgsNumberError = exports.InvalidReturnTypeError = exports.InvalidReturnValueError = exports.InvalidReturnPropertyTypeError = exports.InvalidReturnPropertyValueError = exports.InvalidPropertyTypeError = exports.InvalidPropertyValueError = exports.InvalidArgTypeError = exports.InvalidArgValueError = void 0;
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
const assert_1 = require("assert");
const util_1 = require("util");
const util_types_1 = require("@openinf/util-types");
const util_object_1 = require("@openinf/util-object");
const util_text_1 = require("@openinf/util-text");
const classRegExp = /^([A-Z][a-z0-9]*)+$/;
// Sorted by a rough estimate on most frequently used entries.
const kTypes = [
    'string',
    'function',
    'number',
    'object',
    // Accept 'Function' and 'Object' as alternative to the lower cased version.
    'Function',
    'Object',
    'boolean',
    'bigint',
    'symbol'
];
// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
function getInvalidTypeSubMsg(expected, actual) {
    if (!util_types_1.isArray(expected)) {
        expected = util_types_1.toArray(expected);
    }
    let msg = '';
    let types = [];
    let instances = [];
    let other = [];
    for (const value of expected) {
        assert_1.strict(typeof value === 'string', `All expected entries have to be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        if (kTypes.includes(value)) {
            types.push(value.toLowerCase());
        }
        else if (classRegExp.test(value)) {
            instances.push(value);
        }
        else {
            assert_1.strict(value !== 'object', `The value ${util_text_1.curlyQuote('object')} should be written as ` +
                `${util_text_1.curlyQuote('Object')}`);
            other.push(value);
        }
    }
    // Special handle `object` in case other instances are allowed to outline
    // the differences between each other.
    if (instances.length > 0) {
        const pos = types.indexOf('object');
        if (pos !== -1) {
            types.splice(pos, 1);
            instances.push('Object');
        }
    }
    if (types.length > 0) {
        types = types.map((value) => {
            return util_text_1.curlyQuote(value);
        });
        if (types.length > 2) {
            const last = types.pop();
            msg += `one of type ${types.join(', ')}, or ${last}`;
        }
        else if (types.length === 2) {
            msg += `one of type ${types[0]} or ${types[1]}`;
        }
        else {
            msg += `of type ${types[0]}`;
        }
        if (instances.length > 0 || other.length > 0)
            msg += ' or ';
    }
    if (instances.length > 0) {
        instances = instances.map((value) => {
            return util_text_1.curlyQuote(value);
        });
        if (instances.length > 2) {
            const last = instances.pop();
            msg +=
                `an instance of ${instances.join(', ')}, or ${last}`;
        }
        else {
            msg += `an instance of ${instances[0]}`;
            if (instances.length === 2) {
                msg += ` or ${instances[1]}`;
            }
        }
        if (other.length > 0)
            msg += ' or ';
    }
    if (other.length > 0) {
        other = other.map((value) => {
            return util_text_1.curlyQuote(value);
        });
        if (other.length > 2) {
            const last = other.pop();
            msg += `one of ${other.join(', ')}, or ${last}`;
        }
        else if (other.length === 2) {
            msg += `one of ${other[0]} or ${other[1]}`;
        }
        else {
            if (other[0].toLowerCase() !== other[0])
                msg += 'an ';
            msg += `${other[0]}`;
        }
    }
    msg += getRecievedSubMsg(actual);
    return msg;
}
function getRecievedSubMsg(value) {
    let msg = '';
    if (value == null) {
        msg += `. Received ${util_text_1.curlyQuote(String(value))}`;
    }
    else if (typeof value === 'function' && util_object_1.hasOwn(value, 'name')) {
        msg += `. Received function ${util_text_1.curlyQuote(value.name)}`;
    }
    else if (util_types_1.isObject(value)) {
        if (util_object_1.ownProperty(value, 'constructor') &&
            util_object_1.ownProperty(util_object_1.map(value).constructor, 'name')) {
            msg += `. Received an instance of ${util_text_1.curlyQuote(util_object_1.map(value).constructor.name)}`;
        }
        else {
            const inspected = util_1.inspect(value, { depth: -1, colors: false });
            msg += `. Received ${util_text_1.curlyQuote(inspected.slice(1, -1))}`;
        }
    }
    else {
        msg += `. Received type ${util_text_1.curlyQuote(typeof value)} ` +
            `(${getInspectedMaybeCapped(value, 25)})`;
    }
    return msg;
}
function getInspectedMaybeCapped(value, maxLen) {
    let inspected = util_1.inspect(value, { colors: false }).slice(1, -1);
    if (inspected.length > maxLen) {
        inspected = util_text_1.ellipsify(inspected.slice(0, maxLen));
    }
    return util_text_1.curlyQuote(String(inspected));
}
// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------
/**
 * Thrown in case an invalid or unsupported value was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1121-L1128
 */
class InvalidArgValueError extends TypeError {
    /**
     * @param {string} argName The argument name.
     * @param {unknown} value The actual invalid argument value.
     * @param {string} reason The reason for invalidity.
     */
    constructor(argName, value, reason = 'is invalid') {
        assert_1.strict(typeof argName === 'string', `The ${util_text_1.curlyQuote('argName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        assert_1.strict(typeof argName === 'string', `The ${util_text_1.curlyQuote('reason')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The ${util_text_1.curlyQuote(argName)} argument ${reason}` + getRecievedSubMsg(value));
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidArgValueError';
        this.code = 'ERR_INVALID_ARG_VALUE';
    }
}
exports.InvalidArgValueError = InvalidArgValueError;
/**
 * Thrown in case an argument of the wrong type was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1014-L1120
 */
class InvalidArgTypeError extends TypeError {
    /**
     * @param {string} argName The name of the argument of invalid type.
     * @param {!(Array<string> | string)} expected The argument type(s) expected.
     * @param {unknown} value The actual argument value of invalid type.
     */
    constructor(argName, expected, value) {
        assert_1.strict(typeof argName === 'string', `The ${util_text_1.curlyQuote('argName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The ${util_text_1.curlyQuote(argName)} argument must be ` +
            getInvalidTypeSubMsg(expected, value));
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidArgTypeError';
        this.code = 'ERR_INVALID_ARG_TYPE';
    }
}
exports.InvalidArgTypeError = InvalidArgTypeError;
/**
 * Thrown in case an invalid or unsupported value of an object property.
 */
class InvalidPropertyValueError extends TypeError {
    /**
     * @param {string} objName The name of the object in question.
     * @param {string} propName The property name assigned invalid value.
     * @param {unknown} value The actual invalid property value assigned.
     * @param {string} reason The reason for invalidity.
     */
    constructor(objName, propName, value, reason = 'is invalid') {
        assert_1.strict(typeof objName === 'string', `The ${util_text_1.curlyQuote('objName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        assert_1.strict(typeof propName === 'string', `The ${util_text_1.curlyQuote('propName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The value for the ${util_text_1.curlyQuote(propName)} property of the ` +
            `${util_text_1.curlyQuote(objName)} object ${reason}` + getRecievedSubMsg(value));
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidPropertyValueError';
        this.code = 'ERR_INVALID_PROPERTY_VALUE';
    }
}
exports.InvalidPropertyValueError = InvalidPropertyValueError;
/**
 * Thrown in case an invalid or unsupported value type for an object property.
 */
class InvalidPropertyTypeError extends TypeError {
    /**
     * @param {string} objName The name of the object in question.
     * @param {string} propName The property name assigned value of invalid type.
     * @param {!(Array<string> | string)} expected The property type(s) expected.
     * @param {unknown} value The actual property value of invalid type assigned.
     */
    constructor(objName, propName, expected, value) {
        assert_1.strict(typeof objName === 'string', `The ${util_text_1.curlyQuote('objName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        assert_1.strict(typeof propName === 'string', `The ${util_text_1.curlyQuote('propName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The ${util_text_1.curlyQuote(propName)} property of the ${util_text_1.curlyQuote(objName)} ` +
            `object must be ` + getInvalidTypeSubMsg(expected, value));
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidPropertyTypeError';
        this.code = 'ERR_INVALID_PROPERTY_TYPE';
    }
}
exports.InvalidPropertyTypeError = InvalidPropertyTypeError;
/**
 * Thrown in case a function does not provide a valid value for one of
 * its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1187-L1190
 */
class InvalidReturnPropertyValueError extends TypeError {
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {string} propName The property name assigned the invalid value.
     * @param {unknown} value The actual invalid property value assigned.
     * @param {string} reason The reason for invalidity.
     */
    constructor(funcName, propName, value, reason = 'is invalid') {
        assert_1.strict(typeof funcName === 'string', `The ${util_text_1.curlyQuote('funcName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        assert_1.strict(typeof propName === 'string', `The ${util_text_1.curlyQuote('propName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The value of the ${util_text_1.curlyQuote(propName)} property ` +
            `returned by the ${util_text_1.curlyQuote(funcName)} function ${reason}` +
            getRecievedSubMsg(value));
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidReturnPropertyValueError';
        this.code = 'ERR_INVALID_RETURN_PROPERTY_VALUE';
    }
}
exports.InvalidReturnPropertyValueError = InvalidReturnPropertyValueError;
/**
 * Thrown in case a function does not provide an expected value type for
 * one of its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1191-L1200
 */
class InvalidReturnPropertyTypeError extends TypeError {
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {string} propName The property name assigned value of invalid type.
     * @param {!(Array<string> | string)} expected The property type(s) expected.
     * @param {unknown} value The actual property value of invalid type assigned.
     */
    constructor(funcName, propName, expected, value) {
        assert_1.strict(typeof funcName === 'string', `The ${util_text_1.curlyQuote('funcName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        assert_1.strict(typeof propName === 'string', `The ${util_text_1.curlyQuote('propName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The ${util_text_1.curlyQuote(propName)} property returned by the ` +
            `${util_text_1.curlyQuote(funcName)} function must be ` +
            getInvalidTypeSubMsg(expected, value));
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidReturnPropertyTypeError';
        this.code = 'ERR_INVALID_RETURN_PROPERTY_TYPE';
    }
}
exports.InvalidReturnPropertyTypeError = InvalidReturnPropertyTypeError;
/**
 * Thrown in case a function does not return an expected valid value on
 * execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
class InvalidReturnValueError extends TypeError {
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {unknown} value The actual invalid value returned.
     * @param {string} reason The reason for invalidity.
     */
    constructor(input, funcName, value, reason) {
        assert_1.strict(typeof funcName === 'string', `The ${util_text_1.curlyQuote('funcName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The value returned by the ${util_text_1.curlyQuote(funcName)} ` +
            `function ${reason}` + getRecievedSubMsg(value));
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidReturnValueError';
        this.code = 'ERR_INVALID_RETURN_VALUE';
    }
}
exports.InvalidReturnValueError = InvalidReturnValueError;
/**
 * Thrown in case a function does not return an expected value type on
 * execution, such as when a function is expected to return a promise.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
class InvalidReturnTypeError extends TypeError {
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {!(Array<string> | string)} expected The return type(s) expected.
     * @param {unknown} value The actual value of invalid type returned.
     */
    constructor(input, funcName, expected, value) {
        assert_1.strict(typeof funcName === 'string', `The ${util_text_1.curlyQuote('funcName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`The value returned by the ${util_text_1.curlyQuote(funcName)} function ` +
            `must be ${getInvalidTypeSubMsg(expected, value)}`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidReturnTypeError';
        this.code = 'ERR_INVALID_RETURN_TYPE';
    }
}
exports.InvalidReturnTypeError = InvalidReturnTypeError;
/**
 * Thrown in case the number of arguments passed to a function is invalid.
 */
class InvalidArgsNumberError extends TypeError {
    /**
     * @param {string} funcName The name of the function in question.
     * @param {number} expected The number of arguments expected to be passed.
     * @param {number} value The actual number of arguments passed.
     */
    constructor(funcName, expected, value) {
        assert_1.strict(typeof funcName === 'string', `The ${util_text_1.curlyQuote('funcName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        assert_1.strict(typeof expected === 'number', `The ${util_text_1.curlyQuote('expected')} argument must be of type ` +
            `${util_text_1.curlyQuote('number')}`);
        assert_1.strict(typeof value === 'number', `The ${util_text_1.curlyQuote('value')} argument must be of type ` +
            `${util_text_1.curlyQuote('number')}`);
        super(`The number of arguments expected by the ${util_text_1.curlyQuote(funcName)} ` +
            `function is ${expected}, but ${value} were passed`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'InvalidArgsNumberError';
        this.code = 'ERR_INVALID_ARGS_NUMBER';
    }
}
exports.InvalidArgsNumberError = InvalidArgsNumberError;
/**
 * For APIs that accept options objects, some options might be mandatory. This
 * error is thrown if a required option is missing.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_OPTION
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1294
 */
class MissingOptionError extends TypeError {
    /** @param {string} optName The name of the missing option. */
    constructor(optName) {
        assert_1.strict(typeof optName === 'string', `The ${util_text_1.curlyQuote('optName')} argument must be of type ` +
            `${util_text_1.curlyQuote('string')}`);
        super(`${util_text_1.curlyQuote(optName)} is a missing option that is required`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'MissingOptionError';
        this.code = 'ERR_MISSING_OPTION';
    }
}
exports.MissingOptionError = MissingOptionError;
/**
 * Thrown in case a required argument of an API was not passed.
 *
 * This is only used for strict compliance with the API specification (which in
 * some cases may accept `func(undefined)` but not `func()`). In most native
 * Node.js APIs, `func(undefined)` and `func()` are treated identically, and the
 * `ERR_INVALID_ARG_TYPE` error code may be used instead.
 *
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_ARGS
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1268-L1293
 */
class MissingArgsError extends TypeError {
    /** @param {Array<string>} args The names of the missing arguments. */
    constructor(...args) {
        assert_1.strict(args.length > 0, 'At least one argument needs to be specified');
        let msg = 'The ';
        const len = args.length;
        const wrap = (a) => util_text_1.curlyQuote(a);
        args = args.map((value) => util_types_1.isArray(value) ? [...value].map(wrap).join(' or ') : wrap(String(value)));
        switch (len) {
            case 1:
                msg += `${args[0]} argument`;
                break;
            case 2:
                msg += `${args[0]} and ${args[1]} arguments`;
                break;
            default:
                msg += args.slice(0, len - 1).join(', ');
                msg += `, and ${args[len - 1]} arguments`;
                break;
        }
        super(`${msg} must be specified`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'MissingArgsError';
        this.code = 'ERR_MISSING_ARGS';
    }
}
exports.MissingArgsError = MissingArgsError;
/**
 * Thrown in case an unhandled error occurred (for instance, when an 'error'
 * event is emitted by an EventEmitter without an 'error' handler registered).
 * @see https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1454-L1461
 */
class UnhandledErrorError extends Error {
    constructor(err = undefined) {
        // Using a default argument here is important so the argument is not counted
        // towards `Function#length`.
        const msg = 'Unhandled error.';
        super((err === undefined) ? msg : `${msg} (${err})`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'UnhandledErrorError';
        this.code = 'ERR_UNHANDLED_ERROR';
    }
}
exports.UnhandledErrorError = UnhandledErrorError;
