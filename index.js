"use strict";
/**
 * @license
 * Copyright OpenINF All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://open.inf.is/license
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.UnhandledErrorError = exports.MissingArgsError = exports.MissingOptionError = exports.InvalidArgsNumberError = exports.InvalidReturnTypeError = exports.InvalidReturnValueError = exports.InvalidReturnPropertyTypeError = exports.InvalidReturnPropertyValueError = exports.InvalidPropertyTypeError = exports.InvalidPropertyValueError = exports.InvalidArgTypeError = exports.InvalidArgValueError = void 0;
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var assert_1 = require("assert");
var util_1 = require("util");
var util_types_1 = require("@openinf/util-types");
var util_object_1 = require("@openinf/util-object");
var util_text_1 = require("@openinf/util-text");
var classRegExp = /^([A-Z][a-z0-9]*)+$/;
// Sorted by a rough estimate on most frequently used entries.
var kTypes = [
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
    var e_1, _a;
    if (!util_types_1.isArray(expected)) {
        expected = util_types_1.toArray(expected);
    }
    var msg = '';
    var types = [];
    var instances = [];
    var other = [];
    try {
        for (var expected_1 = __values(expected), expected_1_1 = expected_1.next(); !expected_1_1.done; expected_1_1 = expected_1.next()) {
            var value = expected_1_1.value;
            assert_1.strict(typeof value === 'string', "All expected entries have to be of type " +
                ("" + util_text_1.curlyQuote('string')));
            if (kTypes.includes(value)) {
                types.push(value.toLowerCase());
            }
            else if (classRegExp.test(value)) {
                instances.push(value);
            }
            else {
                assert_1.strict(value !== 'object', "The value " + util_text_1.curlyQuote('object') + " should be written as " +
                    ("" + util_text_1.curlyQuote('Object')));
                other.push(value);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (expected_1_1 && !expected_1_1.done && (_a = expected_1["return"])) _a.call(expected_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // Special handle `object` in case other instances are allowed to outline
    // the differences between each other.
    if (instances.length > 0) {
        var pos = types.indexOf('object');
        if (pos !== -1) {
            types.splice(pos, 1);
            instances.push('Object');
        }
    }
    if (types.length > 0) {
        types = types.map(function (value) {
            return util_text_1.curlyQuote(value);
        });
        if (types.length > 2) {
            var last = types.pop();
            msg += "one of type " + types.join(', ') + ", or " + last;
        }
        else if (types.length === 2) {
            msg += "one of type " + types[0] + " or " + types[1];
        }
        else {
            msg += "of type " + types[0];
        }
        if (instances.length > 0 || other.length > 0)
            msg += ' or ';
    }
    if (instances.length > 0) {
        instances = instances.map(function (value) {
            return util_text_1.curlyQuote(value);
        });
        if (instances.length > 2) {
            var last = instances.pop();
            msg +=
                "an instance of " + instances.join(', ') + ", or " + last;
        }
        else {
            msg += "an instance of " + instances[0];
            if (instances.length === 2) {
                msg += " or " + instances[1];
            }
        }
        if (other.length > 0)
            msg += ' or ';
    }
    if (other.length > 0) {
        other = other.map(function (value) {
            return util_text_1.curlyQuote(value);
        });
        if (other.length > 2) {
            var last = other.pop();
            msg += "one of " + other.join(', ') + ", or " + last;
        }
        else if (other.length === 2) {
            msg += "one of " + other[0] + " or " + other[1];
        }
        else {
            if (other[0].toLowerCase() !== other[0])
                msg += 'an ';
            msg += "" + other[0];
        }
    }
    msg += getRecievedSubMsg(actual);
    return msg;
}
function getRecievedSubMsg(value) {
    var msg = '';
    if (value == null) {
        msg += ". Received " + util_text_1.curlyQuote(String(value));
    }
    else if (typeof value === 'function' && util_object_1.hasOwn(value, 'name')) {
        msg += ". Received function " + util_text_1.curlyQuote(value.name);
    }
    else if (util_types_1.isObject(value)) {
        if (util_object_1.hasOwn(value, 'constructor') && util_object_1.hasOwn(value.constructor, 'name')) {
            msg += ". Received an instance of " + util_text_1.curlyQuote(value.constructor.name);
        }
        else {
            var inspected = util_1.inspect(value, { depth: -1, colors: false });
            msg += ". Received " + util_text_1.curlyQuote(inspected.slice(1, -1));
        }
    }
    else {
        msg += ". Received type " + util_text_1.curlyQuote(typeof value) + " " +
            ("(" + getInspectedMaybeCapped(value, 25) + ")");
    }
    return msg;
}
function getInspectedMaybeCapped(value, maxLen) {
    var inspected = util_1.inspect(value, { colors: false }).slice(1, -1);
    if (inspected.length > maxLen) {
        inspected = util_text_1.ellipsify(inspected.slice(0, maxLen));
    }
    return util_text_1.curlyQuote(inspected);
}
// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------
/**
 * An invalid or unsupported value was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1121-L1128
 */
var InvalidArgValueError = /** @class */ (function (_super) {
    __extends(InvalidArgValueError, _super);
    /**
     * @param {string} argName The argument name.
     * @param {unknown} value The actual invalid argument value.
     * @param {string} reason The reason for invalidity.
     */
    function InvalidArgValueError(argName, value, reason) {
        var _newTarget = this.constructor;
        if (reason === void 0) { reason = 'is invalid'; }
        var _this = this;
        assert_1.strict(typeof argName === 'string', "The " + util_text_1.curlyQuote('argName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof argName === 'string', "The " + util_text_1.curlyQuote('reason') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "The " + util_text_1.curlyQuote(argName) + " argument " + reason + getRecievedSubMsg(value)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidArgValueError';
        _this.code = 'ERR_INVALID_ARG_VALUE';
        return _this;
    }
    return InvalidArgValueError;
}(TypeError));
exports.InvalidArgValueError = InvalidArgValueError;
/**
 * An argument of the wrong type was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1014-L1120
 */
var InvalidArgTypeError = /** @class */ (function (_super) {
    __extends(InvalidArgTypeError, _super);
    /**
     * @param {string} argName The name of the argument of invalid type.
     * @param {!(Array<string> | string)} expected The argument type(s) expected.
     * @param {unknown} value The actual argument value of invalid type.
     */
    function InvalidArgTypeError(argName, expected, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof argName === 'string', "The " + util_text_1.curlyQuote('argName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "The " + util_text_1.curlyQuote(argName) + " argument must be " +
            getInvalidTypeSubMsg(expected, value)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidArgTypeError';
        _this.code = 'ERR_INVALID_ARG_TYPE';
        return _this;
    }
    return InvalidArgTypeError;
}(TypeError));
exports.InvalidArgTypeError = InvalidArgTypeError;
/**
 * An invalid or unsupported value for an object property.
 */
var InvalidPropertyValueError = /** @class */ (function (_super) {
    __extends(InvalidPropertyValueError, _super);
    /**
     * @param {string} objName The name of the object in question.
     * @param {string} propName The property name assigned invalid value.
     * @param {unknown} value The actual invalid property value assigned.
     */
    function InvalidPropertyValueError(objName, propName, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof objName === 'string', "The " + util_text_1.curlyQuote('objName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof propName === 'string', "The " + util_text_1.curlyQuote('propName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "Invalid value for property " + util_text_1.curlyQuote(propName) + " of object " +
            ("" + util_text_1.curlyQuote(objName)) + getRecievedSubMsg(value)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidPropertyValueError';
        _this.code = 'ERR_INVALID_PROPERTY_VALUE';
        return _this;
    }
    return InvalidPropertyValueError;
}(TypeError));
exports.InvalidPropertyValueError = InvalidPropertyValueError;
/**
 * An invalid or unsupported type for an object property.
 */
var InvalidPropertyTypeError = /** @class */ (function (_super) {
    __extends(InvalidPropertyTypeError, _super);
    /**
     * @param {string} objName The name of the object in question.
     * @param {string} propName The property name assigned value of invalid type.
     * @param {!(Array<string> | string)} expected The property type(s) expected.
     * @param {unknown} value The actual property value of invalid type assigned.
     */
    function InvalidPropertyTypeError(objName, propName, expected, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof objName === 'string', "The " + util_text_1.curlyQuote('objName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof propName === 'string', "The " + util_text_1.curlyQuote('propName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "The " + util_text_1.curlyQuote(propName) + " property of object " +
            (util_text_1.curlyQuote(objName) + " must be ") + getRecievedSubMsg(value)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidPropertyTypeError';
        _this.code = 'ERR_INVALID_PROPERTY_TYPE';
        return _this;
    }
    return InvalidPropertyTypeError;
}(TypeError));
exports.InvalidPropertyTypeError = InvalidPropertyTypeError;
/**
 * Thrown in case a function option does not provide a valid value for one of
 * its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1187-L1190
 */
var InvalidReturnPropertyValueError = /** @class */ (function (_super) {
    __extends(InvalidReturnPropertyValueError, _super);
    /**
     * @param {string} input The type of the invalid value.
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {string} propName The property name assigned the invalid value.
     * @param {unknown} value The actual invalid property value assigned.
     */
    function InvalidReturnPropertyValueError(input, funcName, propName, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof input === 'string', "The " + util_text_1.curlyQuote('input') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof funcName === 'string', "The " + util_text_1.curlyQuote('funcName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof propName === 'string', "The " + util_text_1.curlyQuote('propName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "Invalid " + input + " value for property " + util_text_1.curlyQuote(propName) + " " +
            ("returned by the " + util_text_1.curlyQuote(funcName) + " function") +
            getRecievedSubMsg(value)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidReturnPropertyValueError';
        _this.code = 'ERR_INVALID_RETURN_PROPERTY_VALUE';
        return _this;
    }
    return InvalidReturnPropertyValueError;
}(TypeError));
exports.InvalidReturnPropertyValueError = InvalidReturnPropertyValueError;
/**
 * Thrown in case a function option does not provide an expected value type for
 * one of its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1191-L1200
 */
var InvalidReturnPropertyTypeError = /** @class */ (function (_super) {
    __extends(InvalidReturnPropertyTypeError, _super);
    /**
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {string} propName The property name assigned value of invalid type.
     * @param {!(Array<string> | string)} expected The property type(s) expected.
     * @param {unknown} value The actual property value of invalid type assigned.
     */
    function InvalidReturnPropertyTypeError(funcName, propName, expected, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof funcName === 'string', "The " + util_text_1.curlyQuote('funcName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof propName === 'string', "The " + util_text_1.curlyQuote('propName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "The " + util_text_1.curlyQuote(propName) + " property returned by the " +
            (util_text_1.curlyQuote(funcName) + " function must be ") +
            getInvalidTypeSubMsg(expected, value)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidReturnPropertyTypeError';
        _this.code = 'ERR_INVALID_RETURN_PROPERTY_TYPE';
        return _this;
    }
    return InvalidReturnPropertyTypeError;
}(TypeError));
exports.InvalidReturnPropertyTypeError = InvalidReturnPropertyTypeError;
/**
 * Thrown in case a function option does not return an expected valid value on
 * execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
var InvalidReturnValueError = /** @class */ (function (_super) {
    __extends(InvalidReturnValueError, _super);
    /**
     * @param {string} input The type of the invalid return value.
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {unknown} value The actual invalid value returned.
     */
    function InvalidReturnValueError(input, funcName, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof input === 'string', "The " + util_text_1.curlyQuote('input') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof funcName === 'string', "The " + util_text_1.curlyQuote('funcName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "Invalid " + input + " value returned by the " + util_text_1.curlyQuote(funcName) + " " +
            "function" + getRecievedSubMsg(value)) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidReturnValueError';
        _this.code = 'ERR_INVALID_RETURN_VALUE';
        return _this;
    }
    return InvalidReturnValueError;
}(TypeError));
exports.InvalidReturnValueError = InvalidReturnValueError;
/**
 * Thrown in case a function option does not return an expected value type on
 * execution, such as when a function is expected to return a promise.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
var InvalidReturnTypeError = /** @class */ (function (_super) {
    __extends(InvalidReturnTypeError, _super);
    /**
     * @param {string} input The type of the invalid return value.
     * @param {string} funcName The name of the function returning the invalidity.
     * @param {!(Array<string> | string)} expected The return type(s) expected.
     * @param {unknown} value The actual value of invalid type returned.
     */
    function InvalidReturnTypeError(input, funcName, expected, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof input === 'string', "The " + util_text_1.curlyQuote('input') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof funcName === 'string', "The " + util_text_1.curlyQuote('funcName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, "The value returned for the " + util_text_1.curlyQuote(funcName) + " function " +
            ("must be " + getInvalidTypeSubMsg([String(expected)], value))) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidReturnTypeError';
        _this.code = 'ERR_INVALID_RETURN_TYPE';
        return _this;
    }
    return InvalidReturnTypeError;
}(TypeError));
exports.InvalidReturnTypeError = InvalidReturnTypeError;
/**
 * The number of arguments passed to a function is invalid.
 */
var InvalidArgsNumberError = /** @class */ (function (_super) {
    __extends(InvalidArgsNumberError, _super);
    /**
     * @param {string} funcName The name of the function in question.
     * @param {number} expected The number of arguments expected to be passed.
     * @param {number} value The actual number of arguments passed.
     */
    function InvalidArgsNumberError(funcName, expected, value) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof funcName === 'string', "The " + util_text_1.curlyQuote('funcName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        assert_1.strict(typeof expected === 'number', "The " + util_text_1.curlyQuote('expected') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('number')));
        assert_1.strict(typeof value === 'number', "The " + util_text_1.curlyQuote('value') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('number')));
        _this = _super.call(this, "The number of arguments expected by function " +
            (util_text_1.curlyQuote(funcName) + " is " + expected + ", but " + value + " were passed")) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'InvalidArgsNumberError';
        _this.code = 'ERR_INVALID_ARGS_NUMBER';
        return _this;
    }
    return InvalidArgsNumberError;
}(TypeError));
exports.InvalidArgsNumberError = InvalidArgsNumberError;
/**
 * For APIs that accept options objects, some options might be mandatory. This
 * error is thrown if a required option is missing.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_OPTION
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1294
 */
var MissingOptionError = /** @class */ (function (_super) {
    __extends(MissingOptionError, _super);
    /** @param {string} optName The missing option name. */
    function MissingOptionError(optName) {
        var _newTarget = this.constructor;
        var _this = this;
        assert_1.strict(typeof optName === 'string', "The " + util_text_1.curlyQuote('optName') + " argument must be of type " +
            ("" + util_text_1.curlyQuote('string')));
        _this = _super.call(this, util_text_1.curlyQuote(optName) + " is a missing option that is required") || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'MissingOptionError';
        _this.code = 'ERR_MISSING_OPTION';
        return _this;
    }
    return MissingOptionError;
}(TypeError));
exports.MissingOptionError = MissingOptionError;
/**
 * A required argument of a Node.js API was not passed. This is only used for
 * strict compliance with the API specification (which in some cases may accept
 * `func(undefined)` but not `func()`). In most native Node.js APIs,
 * `func(undefined)` and `func()` are treated identically, and the
 * `ERR_INVALID_ARG_TYPE` error code may be used instead.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_ARGS
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1268-L1293
 */
var MissingArgsError = /** @class */ (function (_super) {
    __extends(MissingArgsError, _super);
    /** @param {Array<string>} args The missing argument names. */
    function MissingArgsError() {
        var _newTarget = this.constructor;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        assert_1.strict(args.length > 0, 'At least one argument needs to be specified');
        var msg = 'The ';
        var len = args.length;
        var wrap = function (a) { return util_text_1.curlyQuote(a); };
        args = args.map(function (value) {
            return util_types_1.isArray(value) ? __spread(value).map(wrap).join(' or ') : wrap(String(value));
        });
        switch (len) {
            case 1:
                msg += args[0] + " argument";
                break;
            case 2:
                msg += args[0] + " and " + args[1] + " arguments";
                break;
            default:
                msg += args.slice(0, len - 1).join(', ');
                msg += ", and " + args[len - 1] + " arguments";
                break;
        }
        _this = _super.call(this, msg + " must be specified") || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'MissingArgsError';
        _this.code = 'ERR_MISSING_ARGS';
        return _this;
    }
    return MissingArgsError;
}(TypeError));
exports.MissingArgsError = MissingArgsError;
/**
 * An unhandled error occurred (for instance, when an 'error' event is emitted
 * by an EventEmitter but an 'error' handler is not registered).
 * @see https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1454-L1461
 */
var UnhandledErrorError = /** @class */ (function (_super) {
    __extends(UnhandledErrorError, _super);
    function UnhandledErrorError(err) {
        var _newTarget = this.constructor;
        if (err === void 0) { err = undefined; }
        var _this = this;
        // Using a default argument here is important so the argument is not counted
        // towards `Function#length`.
        var msg = 'Unhandled error.';
        _this = _super.call(this, (err === undefined) ? msg : msg + " (" + err + ")") || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'UnhandledErrorError';
        _this.code = 'ERR_UNHANDLED_ERROR';
        return _this;
    }
    return UnhandledErrorError;
}(Error));
exports.UnhandledErrorError = UnhandledErrorError;
