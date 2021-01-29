/**
 * @license
 * Copyright OpenINF All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://open.inf.is/license
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { strict as assert } from 'assert';
import { inspect as utilInspect } from 'util';
import { isArray } from '@openinf/util-types';
import { curlyQuote, ellipsify } from '@openinf/util-text';

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

function getCommonInvalidTypeMessage(expected:string[],
  actual:unknown):string {
  let msg = '';
  let types = [];
  let instances = [];
  let other = [];

  for (const value of expected) {
    assert(typeof value === 'string',
      `All expected entries have to be of type ` +
        `${curlyQuote('string')}`);
    if (kTypes.includes(value)) {
      types.push(value.toLowerCase());
    } else if (classRegExp.test(value)) {
      instances.push(value);
    } else {
      assert(value !== 'object',
        `The value ${curlyQuote('object')} should be written as ` +
        `${curlyQuote('Object')}`);
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
      return curlyQuote(value);
    });
    if (types.length > 2) {
      const last = types.pop();
      msg += `one of type ${types.join(', ')}, or ${last}`;
    } else if (types.length === 2) {
      msg += `one of type ${types[0]} or ${types[1]}`;
    } else {
      msg += `of type ${types[0]}`;
    }
    if (instances.length > 0 || other.length > 0)
      msg += ' or ';
  }

  if (instances.length > 0) {
    instances = instances.map((value) => {
      return curlyQuote(value);
    });
    if (instances.length > 2) {
      const last = instances.pop();
      msg +=
        `an instance of ${instances.join(', ')}, or ${last}`;
    } else {
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
      return curlyQuote(value);
    });
    if (other.length > 2) {
      const last = other.pop();
      msg += `one of ${other.join(', ')}, or ${last}`;
    } else if (other.length === 2) {
      msg += `one of ${other[0]} or ${other[1]}`;
    } else {
      if (other[0].toLowerCase() !== other[0])
        msg += 'an ';
      msg += `${other[0]}`;
    }
  }

  if (actual == null) {
    msg += `. Received ${curlyQuote(String(actual))}`;
  } else if (typeof actual === 'function' && actual.name) {
    msg += `. Received function ${curlyQuote(actual.name)}`;
  } else if (typeof actual === 'object') {
    if (actual.constructor && actual.constructor.name) {
      msg += `. Received an instance of ${
        curlyQuote(actual.constructor.name)
      }`;
    } else {
      const inspected = utilInspect(actual, { depth: -1 }).slice(1, -1);
      msg += `. Received ${curlyQuote(inspected)}`;
    }
  } else {
    let inspected = utilInspect(actual, { colors: false }).slice(1, -1);
    if (inspected.length > 25)
      inspected = `${ellipsify(inspected.slice(0, 25))}`;
    msg += `. Received type ${curlyQuote(typeof actual)} ` +
      `(${curlyQuote(inspected)})`;
  }
  return msg;
}

// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------

/**
 * An invalid or unsupported value was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1121-L1128
 */
export class InvalidArgValueError extends TypeError {
  code!: string;

  /**
   * @param {string} name The argument name.
   * @param {unknown} value The argument value.
   * @param {string} reason The reason for invalidity.
   */
  constructor(name:string, value:unknown, reason:string = 'is invalid') {
    let inspected = utilInspect(value).slice(1, -1);
    if (inspected.length > 128) {
      inspected = `${ellipsify(inspected.slice(0, 128))}`;
    }
    super(
      `The ${curlyQuote(name)} argument ${reason}. ` +
        `Received ${curlyQuote(inspected)}`
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidArgValueError';
    this.code = 'ERR_INVALID_ARG_VALUE';
  }
}

/**
 * An argument of the wrong type was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1014-L1120
 */
export class InvalidArgTypeError extends TypeError {
  code!: string;

  /**
   * @param {string} argName The argument name.
   * @param {!(Array<string> | string)} expected The argument type(s) expected.
   * @param {unknown} actual The actual argument.
   */
  constructor(argName:string, expected:(string[] | string), actual:unknown) {
    assert(typeof argName === 'string',
      `The ${curlyQuote('argName')} argument must be of type ` +
        `${curlyQuote('string')}`);

    let msg = `The ${curlyQuote(argName)} argument must be `;

    if (!isArray(expected)) {
      msg += getCommonInvalidTypeMessage([String(expected)], actual); ;
    } else {
      msg += getCommonInvalidTypeMessage([ ...expected ], actual); ;
    }

    super(msg);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidArgTypeError';
    this.code = 'ERR_INVALID_ARG_TYPE';
  }
}

/**
 * An invalid or unsupported value for an object property.
 */
export class InvalidPropertyValueError extends TypeError {
  code!: string;

  /**
   * @param {string} objName The object name.
   * @param {string} propName The property name.
   * @param {unknown} propValue The property value.
   */
  constructor(objName:string, propName:string, propValue:unknown) {
    let inspected = utilInspect(propValue).slice(1, -1);
    if (inspected.length > 128) {
      inspected = `${ellipsify(inspected.slice(0, 128))}`;
    }
  
    super(
      `Invalid value for property ${curlyQuote(propName)} of object ` +
        `${curlyQuote(objName)}. Received ${curlyQuote(inspected)}`
    );
  
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidPropertyValueError';
    this.code = 'ERR_INVALID_PROPERTY_VALUE';
  }
}

/**
 * An invalid or unsupported type for an object property.
 */
export class InvalidPropertyTypeError extends TypeError {
  code!: string;

  /**
   * @param {string} objName The object name.
   * @param {string} propName The property name.
   * @param {!(Array<string> | string)} expected The property type(s) expected.
   * @param {unknown} actual The actual property value.
   */
  constructor(objName:string, propName:string, expected:(string[] | string),
    actual:unknown) {
    assert(typeof objName === 'string',
      `The ${curlyQuote('objName')} argument must be of type ` +
        `${curlyQuote('string')}`);

    assert(typeof propName === 'string',
    `The ${curlyQuote('propName')} argument must be of type ` +
      `${curlyQuote('string')}`);

    if (!isArray(expected)) {
      expected = [String(expected)];
    }

    let msg = `The ${curlyQuote(propName)} property of object ` +
      `${curlyQuote(objName)} must be `;

    if (!isArray(expected)) {
      msg += getCommonInvalidTypeMessage([String(expected)], actual); ;
    } else {
      msg += getCommonInvalidTypeMessage([ ...expected ], actual); ;
    }

    super(msg);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidPropertyTypeError';
    this.code = 'ERR_INVALID_PROPERTY_TYPE';
  }
}

/**
 * The number of arguments passed to a function is invalid.
 */
export class InvalidArgsNumberError extends TypeError {
  code!: string;

  /**
   * @param {string} funcName The function name.
   * @param {number} expected The number of arguments expected to be passed.
   * @param {number} actual The actual number of arguments passed.
   */
  constructor(funcName:string, expected:number, actual:number) {
    super(`The number of arguments expected by function ` +
      `${curlyQuote(funcName)} is ${expected}, but ${actual} were passed`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidArgsNumberError';
    this.code = 'ERR_INVALID_ARGS_NUMBER';
  }
}

/**
 * For APIs that accept options objects, some options might be mandatory. This
 * error is thrown if a required option is missing.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_OPTION
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1294
 */
export class MissingOptionError extends TypeError {
  code!: string;

  /** @param {string} optName The missing option name. */
  constructor(optName:string) {
    super(`${curlyQuote(optName)} is a missing option that is required`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'MissingOptionError';
    this.code = 'ERR_MISSING_OPTION';
  }
}

/**
 * Thrown in case a function option does not provide a valid value for one of
 * its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1187-L1190
 */
export class InvalidReturnPropertyValueError extends TypeError {
  code!: string;

  /**
   * @param {string} input The type of the invalid value.
   * @param {string} name The name of the function that returned the value.
   * @param {string} prop The property name of the invalid value.
   * @param {unknown} value The actual invalid value.
   */
  constructor(input:string, name:string, prop:string, value:unknown) {
    super(`Expected a valid ${curlyQuote(input)} to be returned for the ` +
      `${curlyQuote(prop)} from the ${curlyQuote(name)} function, but got ` +
      `${curlyQuote(String(value))}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnPropertyValueError';
    this.code = 'ERR_INVALID_RETURN_PROPERTY_VALUE';
  }
}

/**
 * Thrown in case a function option does not provide an expected value type for
 * one of its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1191-L1200
 */
export class InvalidReturnPropertyTypeError extends TypeError {
  code!: string;
  
  /**
   * @param {string} input The type of the invalid value.
   * @param {string} name The name of the function that returned the value.
   * @param {string} prop The property name of the invalid value.
   * @param {unknown} value The actual invalid value.
   */
  constructor(input:string, name:string, prop:string, value:unknown) {
    let type;
    if (value && value.constructor && value.constructor.name) {
      type = `instance of ${value.constructor.name}`;
    } else {
      type = `type ${typeof value}`;
    }
    super(`Expected ${curlyQuote(input)} to be returned for the ` +
    `${curlyQuote(prop)} from the ${curlyQuote(name)} function, but got ` +
    `${curlyQuote(type)}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnPropertyTypeError';
    this.code = 'ERR_INVALID_RETURN_PROPERTY_TYPE';
  }
}

/**
 * Thrown in case a function option does not return an expected valid value on
 * execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
export class InvalidReturnValueError extends TypeError {
  code!: string;

  /**
   * @param {string} input The type of the invalid value.
   * @param {string} name The name of the function that returned the value.
   * @param {unknown} value The actual invalid value.
   */
  constructor(input:string, name:string, value:unknown) {
    let type;
    if (value && value.constructor && value.constructor.name) {
      type = `instance of ${value.constructor.name}`;
    } else {
      type = `type ${typeof value}`;
    }
    super(`Expected a valid ${curlyQuote(input)} to be returned from the ` +
      `${curlyQuote(name)} function, but got ${curlyQuote(String(value))}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnValueError';
    this.code = 'ERR_INVALID_RETURN_VALUE';
  }
}

/**
 * Thrown in case a function option does not return an expected value type on
 * execution, such as when a function is expected to return a promise.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210
 */
export class InvalidReturnTypeError extends TypeError {
  code!: string;

  /**
   * @param {string} input The type of the invalid value.
   * @param {string} name The name of the function that returned the value.
   * @param {unknown} value The actual invalid value.
   */
  constructor(input:string, name:string, value:unknown) {
    let type;
    if (value && value.constructor && value.constructor.name) {
      type = `instance of ${value.constructor.name}`;
    } else {
      type = `type ${typeof value}`;
    }
    super(`Expected ${curlyQuote(input)} to be returned from the ` +
      `${curlyQuote(name)} function but got ${curlyQuote(type)}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnTypeError';
    this.code = 'ERR_INVALID_RETURN_TYPE';
  }
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
export class MissingArgsError extends TypeError {
  code!: string;

  /** @param {Array<string>} args The missing argument names. */
  constructor(...args: string[]) {
    assert(args.length > 0, 'At least one argument needs to be specified');
    let msg = 'The ';
    const len = args.length;
    const wrap = (a:string):string => curlyQuote(a);

    args = args.map((value:(string | string[])):string =>
      isArray(value) ? [...value].map(wrap).join(' or ') : wrap(String(value)));

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

/**
 * An unhandled error occurred (for instance, when an 'error' event is emitted
 * by an EventEmitter but an 'error' handler is not registered).
 * @see https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR
 * @see https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1454-L1461
 */
export class UnhandledErrorError extends Error {
  code!: string;

  constructor(err:(string | undefined) = undefined) {
    // Using a default argument here is important so the argument is not counted
    // towards `Function#length`.
    const msg = 'Unhandled error.';
    super((err === undefined) ? msg : `${msg} (${err})`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'UnhandledErrorError';
    this.code = 'ERR_UNHANDLED_ERROR';
  }
}
