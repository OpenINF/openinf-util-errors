import { strict as assert } from 'assert';
import { inspect as utilInspect } from 'util';
import { isArray, isObject } from '@openinf/util-types';
import { hasOwn, map } from '@openinf/util-object';
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

function getInvalidTypeSubMsg(expected:(string | string[]),
  actual:unknown):string {
  if (!isArray(expected)) { expected = [String(expected)]; }

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

  msg += getRecievedSubMsg(actual);

  return msg;
}

function getRecievedSubMsg(value:unknown):string {
  let msg = '';
  if (value == null) {
    msg += `. Received ${curlyQuote(String(value))}`;
  } else if (typeof value === 'function' && hasOwn(value, 'name')) {
    msg += `. Received function ${curlyQuote(value.name)}`;
  } else if (isObject(value)) {
    if (hasOwn(value, 'constructor') &&
      hasOwn(map(value).constructor, 'name')) {
      msg += `. Received an instance of ${
        curlyQuote(map(value).constructor.name)
      }`;
    } else {
      const inspected = utilInspect(value, { depth: -1, colors: false });
      msg += `. Received ${curlyQuote(inspected.slice(1, -1))}`;
    }
  } else {
    msg += `. Received type ${curlyQuote(typeof value)} ` +
      `(${getInspectedMaybeCapped(value, 25)})`;
  }
  return msg;
}

function getInspectedMaybeCapped(value:unknown, maxLen:number):string {
  let inspected = utilInspect(value, { colors: false }).slice(1, -1);
  if (inspected.length > maxLen) {
    inspected = ellipsify(inspected.slice(0, maxLen));
  }
  return curlyQuote(String(inspected));
}

// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------

/**
 * Thrown in case an invalid or unsupported value was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE
 */
export class InvalidArgValueError extends TypeError {
  code!: string;

  /**
   * @param {string} argName The argument name.
   * @param {unknown} value The actual invalid argument value.
   * @param {string} reason The reason for invalidity.
   */
  constructor(argName:string, value:unknown, reason = 'is invalid') {
    assert(typeof argName === 'string',
      `The ${curlyQuote('argName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    assert(typeof argName === 'string',
      `The ${curlyQuote('reason')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(
      `The ${curlyQuote(argName)} argument ${reason}` + getRecievedSubMsg(value)
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidArgValueError';
    this.code = 'ERR_INVALID_ARG_VALUE';
  }
}

/**
 * Thrown in case an argument of the wrong type was passed for a given argument.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE
 */
export class InvalidArgTypeError extends TypeError {
  code!: string;

  /**
   * @param {string} argName The name of the argument of invalid type.
   * @param {!(Array<string> | string)} expected The argument type(s) expected.
   * @param {unknown} value The actual argument value of invalid type.
   */
  constructor(argName:string, expected:(string[] | string), value:unknown) {
    assert(typeof argName === 'string',
      `The ${curlyQuote('argName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(`The ${curlyQuote(argName)} argument must be ` +
      getInvalidTypeSubMsg(expected, value));
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidArgTypeError';
    this.code = 'ERR_INVALID_ARG_TYPE';
  }
}

/**
 * Thrown in case an invalid or unsupported value of an object property.
 */
export class InvalidPropertyValueError extends TypeError {
  code!: string;

  /**
   * @param {string} objName The name of the object in question.
   * @param {string} propName The property name assigned invalid value.
   * @param {unknown} value The actual invalid property value assigned.
   * @param {string} reason The reason for invalidity.
   */
  constructor(objName:string, propName:string, value:unknown,
    reason = 'is invalid') {
    assert(typeof objName === 'string',
    `The ${curlyQuote('objName')} argument must be of type ` +
      `${curlyQuote('string')}`);
    assert(typeof propName === 'string',
    `The ${curlyQuote('propName')} argument must be of type ` +
      `${curlyQuote('string')}`);
    super(
      `The value for the ${curlyQuote(propName)} property of the ` +
        `${curlyQuote(objName)} object ${reason}` + getRecievedSubMsg(value)
    );
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidPropertyValueError';
    this.code = 'ERR_INVALID_PROPERTY_VALUE';
  }
}

/**
 * Thrown in case an invalid or unsupported value type for an object property.
 */
export class InvalidPropertyTypeError extends TypeError {
  code!: string;

  /**
   * @param {string} objName The name of the object in question.
   * @param {string} propName The property name assigned value of invalid type.
   * @param {!(Array<string> | string)} expected The property type(s) expected.
   * @param {unknown} value The actual property value of invalid type assigned.
   */
  constructor(objName:string, propName:string, expected:(string[] | string),
    value:unknown) {
    assert(typeof objName === 'string',
      `The ${curlyQuote('objName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    assert(typeof propName === 'string',
      `The ${curlyQuote('propName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(`The ${curlyQuote(propName)} property of the ${curlyQuote(objName)} ` +
      `object must be ` + getInvalidTypeSubMsg(expected, value));
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidPropertyTypeError';
    this.code = 'ERR_INVALID_PROPERTY_TYPE';
  }
}

/**
 * Thrown in case a function does not provide a valid value for one of
 * its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY
 */
export class InvalidReturnPropertyValueError extends TypeError {
  code!: string;

  /**
   * @param {string} funcName The name of the function returning the invalidity.
   * @param {string} propName The property name assigned the invalid value.
   * @param {unknown} value The actual invalid property value assigned.
   * @param {string} reason The reason for invalidity.
   */
  constructor(funcName:string, propName:string, value:unknown,
    reason = 'is invalid') {
    assert(typeof funcName === 'string',
      `The ${curlyQuote('funcName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    assert(typeof propName === 'string',
      `The ${curlyQuote('propName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(`The value of the ${curlyQuote(propName)} property ` +
      `returned by the ${curlyQuote(funcName)} function ${reason}` +
        getRecievedSubMsg(value));
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnPropertyValueError';
    this.code = 'ERR_INVALID_RETURN_PROPERTY_VALUE';
  }
}

/**
 * Thrown in case a function does not provide an expected value type for
 * one of its returned object properties on execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE
 */
export class InvalidReturnPropertyTypeError extends TypeError {
  code!: string;

  /**
   * @param {string} funcName The name of the function returning the invalidity.
   * @param {string} propName The property name assigned value of invalid type.
   * @param {!(Array<string> | string)} expected The property type(s) expected.
   * @param {unknown} value The actual property value of invalid type assigned.
   */
  constructor(funcName:string, propName:string, expected:(string[] | string),
    value:unknown) {
    assert(typeof funcName === 'string',
      `The ${curlyQuote('funcName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    assert(typeof propName === 'string',
      `The ${curlyQuote('propName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(`The ${curlyQuote(propName)} property returned by the ` +
      `${curlyQuote(funcName)} function must be ` +
        getInvalidTypeSubMsg(expected, value));
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnPropertyTypeError';
    this.code = 'ERR_INVALID_RETURN_PROPERTY_TYPE';
  }
}

/**
 * Thrown in case a function does not return an expected valid value on
 * execution.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 */
export class InvalidReturnValueError extends TypeError {
  code!: string;

  /**
   * @param {string} funcName The name of the function returning the invalidity.
   * @param {unknown} value The actual invalid value returned.
   * @param {string} reason The reason for invalidity.
   */
  constructor(input:string, funcName:string, value:unknown, reason:string) {
    assert(typeof funcName === 'string',
      `The ${curlyQuote('funcName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(`The value returned by the ${curlyQuote(funcName)} ` +
      `function ${reason}` + getRecievedSubMsg(value));
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnValueError';
    this.code = 'ERR_INVALID_RETURN_VALUE';
  }
}

/**
 * Thrown in case a function does not return an expected value type on
 * execution, such as when a function is expected to return a promise.
 * @see https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
 */
export class InvalidReturnTypeError extends TypeError {
  code!: string;

  /**
   * @param {string} funcName The name of the function returning the invalidity.
   * @param {!(Array<string> | string)} expected The return type(s) expected.
   * @param {unknown} value The actual value of invalid type returned.
   */
  constructor(input:string, funcName:string, expected:(string[] | string),
    value:unknown) {
    assert(typeof funcName === 'string',
      `The ${curlyQuote('funcName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(`The value returned by the ${curlyQuote(funcName)} function ` +
      `must be ${getInvalidTypeSubMsg(expected, value)}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidReturnTypeError';
    this.code = 'ERR_INVALID_RETURN_TYPE';
  }
}

/**
 * Thrown in case the number of arguments passed to a function is invalid.
 */
export class InvalidArgsNumberError extends TypeError {
  code!: string;

  /**
   * @param {string} funcName The name of the function in question.
   * @param {number} expected The number of arguments expected to be passed.
   * @param {number} value The actual number of arguments passed.
   */
  constructor(funcName:string, expected:number, value:number) {
    assert(typeof funcName === 'string',
      `The ${curlyQuote('funcName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    assert(typeof expected === 'number',
      `The ${curlyQuote('expected')} argument must be of type ` +
        `${curlyQuote('number')}`);
    assert(typeof value === 'number',
      `The ${curlyQuote('value')} argument must be of type ` +
        `${curlyQuote('number')}`);
    super(`The number of arguments expected by the ${curlyQuote(funcName)} ` +
      `function is ${expected}, but ${value} were passed`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidArgsNumberError';
    this.code = 'ERR_INVALID_ARGS_NUMBER';
  }
}

/**
 * For APIs that accept options objects, some options might be mandatory. This
 * error is thrown if a required option is missing.
 * @see https://nodejs.org/api/errors.html#ERR_MISSING_OPTION
 */
export class MissingOptionError extends TypeError {
  code!: string;
  /** @param {string} optName The name of the missing option. */
  constructor(optName:string) {
    assert(typeof optName === 'string',
      `The ${curlyQuote('optName')} argument must be of type ` +
        `${curlyQuote('string')}`);
    super(`${curlyQuote(optName)} is a missing option that is required`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'MissingOptionError';
    this.code = 'ERR_MISSING_OPTION';
  }
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
export class MissingArgsError extends TypeError {
  code!: string;

  /** @param {Array<string>} args The names of the missing arguments. */
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
 * Thrown in case an unhandled error occurred (for instance, when an 'error'
 * event is emitted by an EventEmitter without an 'error' handler registered).
 * @see https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR
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
