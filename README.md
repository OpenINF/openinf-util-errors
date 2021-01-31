<h1 align="center">@openinf/util-errors</h1>

<p align="center">Essential utility errors inspired by Node.js core error codes</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/@openinf/util-errors"><img src="https://img.shields.io/npm/v/@openinf/util-errors?style=plastic" alt="view on npm" /></a>
  <img src="https://img.shields.io/github/languages/top/openinf/util-errors?color=blue&style=plastic" />
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/openinf/openinf.github.io?color=blue&style=plastic" alt="License: MIT" /></a>
</p>

<br />

_The high-level goal of `@openinf/util-errors` is to serve as a Node.js package
containing **essential utility error classes** that take the form of those found
and used in Node.js core. As is the case with any software project in continuous
development, omissions and errors may exist, for which contributions are
welcome._

<br />

---

<br />

## Classes

<dl>
<dt><a href="#InvalidArgValueError">InvalidArgValueError</a></dt>
<dd><p>Thrown in case an invalid or unsupported value was passed for a given argument.</p>
</dd>
<dt><a href="#InvalidArgTypeError">InvalidArgTypeError</a></dt>
<dd><p>Thrown in case an argument of the wrong type was passed for a given argument.</p>
</dd>
<dt><a href="#InvalidPropertyValueError">InvalidPropertyValueError</a></dt>
<dd><p>Thrown in case an invalid or unsupported value of an object property.</p>
</dd>
<dt><a href="#InvalidPropertyTypeError">InvalidPropertyTypeError</a></dt>
<dd><p>Thrown in case an invalid or unsupported value type for an object property.</p>
</dd>
<dt><a href="#InvalidReturnPropertyValueError">InvalidReturnPropertyValueError</a></dt>
<dd><p>Thrown in case a function does not provide a valid value for one of
its returned object properties on execution.</p>
</dd>
<dt><a href="#InvalidReturnPropertyTypeError">InvalidReturnPropertyTypeError</a></dt>
<dd><p>Thrown in case a function does not provide an expected value type for
one of its returned object properties on execution.</p>
</dd>
<dt><a href="#InvalidReturnValueError">InvalidReturnValueError</a></dt>
<dd><p>Thrown in case a function does not return an expected valid value on
execution.</p>
</dd>
<dt><a href="#InvalidReturnTypeError">InvalidReturnTypeError</a></dt>
<dd><p>Thrown in case a function does not return an expected value type on
execution, such as when a function is expected to return a promise.</p>
</dd>
<dt><a href="#InvalidArgsNumberError">InvalidArgsNumberError</a></dt>
<dd><p>Thrown in case the number of arguments passed to a function is invalid.</p>
</dd>
<dt><a href="#MissingOptionError">MissingOptionError</a></dt>
<dd><p>For APIs that accept options objects, some options might be mandatory. This
error is thrown if a required option is missing.</p>
</dd>
<dt><a href="#MissingArgsError">MissingArgsError</a></dt>
<dd><p>Thrown in case a required argument of an API was not passed.</p>
<p>This is only used for strict compliance with the API specification (which in
some cases may accept <code>func(undefined)</code> but not <code>func()</code>). In most native
Node.js APIs, <code>func(undefined)</code> and <code>func()</code> are treated identically, and the
<code>ERR_INVALID_ARG_TYPE</code> error code may be used instead.</p>
</dd>
<dt><a href="#UnhandledErrorError">UnhandledErrorError</a></dt>
<dd><p>Thrown in case an unhandled error occurred (for instance, when an &#39;error&#39;
event is emitted by an EventEmitter without an &#39;error&#39; handler registered).</p>
</dd>
</dl>

<a name="InvalidArgValueError"></a>

## InvalidArgValueError
Thrown in case an invalid or unsupported value was passed for a given argument.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1121-L1128

<a name="new_InvalidArgValueError_new"></a>

### new InvalidArgValueError(argName, value, reason)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| argName | <code>string</code> |  | The argument name. |
| value | <code>unknown</code> |  | The actual invalid argument value. |
| reason | <code>string</code> | <code>&quot;is invalid&quot;</code> | The reason for invalidity. |

<a name="InvalidArgTypeError"></a>

## InvalidArgTypeError
Thrown in case an argument of the wrong type was passed for a given argument.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1014-L1120

<a name="new_InvalidArgTypeError_new"></a>

### new InvalidArgTypeError(argName, expected, value)

| Param | Type | Description |
| --- | --- | --- |
| argName | <code>string</code> | The name of the argument of invalid type. |
| expected | <code>Array.&lt;string&gt;</code> \| <code>string</code> | The argument type(s) expected. |
| value | <code>unknown</code> | The actual argument value of invalid type. |

<a name="InvalidPropertyValueError"></a>

## InvalidPropertyValueError
Thrown in case an invalid or unsupported value of an object property.

**Kind**: global class  
<a name="new_InvalidPropertyValueError_new"></a>

### new InvalidPropertyValueError(objName, propName, value, reason)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| objName | <code>string</code> |  | The name of the object in question. |
| propName | <code>string</code> |  | The property name assigned invalid value. |
| value | <code>unknown</code> |  | The actual invalid property value assigned. |
| reason | <code>string</code> | <code>&quot;is invalid&quot;</code> | The reason for invalidity. |

<a name="InvalidPropertyTypeError"></a>

## InvalidPropertyTypeError
Thrown in case an invalid or unsupported value type for an object property.

**Kind**: global class  
<a name="new_InvalidPropertyTypeError_new"></a>

### new InvalidPropertyTypeError(objName, propName, expected, value)

| Param | Type | Description |
| --- | --- | --- |
| objName | <code>string</code> | The name of the object in question. |
| propName | <code>string</code> | The property name assigned value of invalid type. |
| expected | <code>Array.&lt;string&gt;</code> \| <code>string</code> | The property type(s) expected. |
| value | <code>unknown</code> | The actual property value of invalid type assigned. |

<a name="InvalidReturnPropertyValueError"></a>

## InvalidReturnPropertyValueError
Thrown in case a function does not provide a valid value for one of
its returned object properties on execution.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1187-L1190

<a name="new_InvalidReturnPropertyValueError_new"></a>

### new InvalidReturnPropertyValueError(funcName, propName, value, reason)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| funcName | <code>string</code> |  | The name of the function returning the invalidity. |
| propName | <code>string</code> |  | The property name assigned the invalid value. |
| value | <code>unknown</code> |  | The actual invalid property value assigned. |
| reason | <code>string</code> | <code>&quot;is invalid&quot;</code> | The reason for invalidity. |

<a name="InvalidReturnPropertyTypeError"></a>

## InvalidReturnPropertyTypeError
Thrown in case a function does not provide an expected value type for
one of its returned object properties on execution.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1191-L1200

<a name="new_InvalidReturnPropertyTypeError_new"></a>

### new InvalidReturnPropertyTypeError(funcName, propName, expected, value)

| Param | Type | Description |
| --- | --- | --- |
| funcName | <code>string</code> | The name of the function returning the invalidity. |
| propName | <code>string</code> | The property name assigned value of invalid type. |
| expected | <code>Array.&lt;string&gt;</code> \| <code>string</code> | The property type(s) expected. |
| value | <code>unknown</code> | The actual property value of invalid type assigned. |

<a name="InvalidReturnValueError"></a>

## InvalidReturnValueError
Thrown in case a function does not return an expected valid value on
execution.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210

<a name="new_InvalidReturnValueError_new"></a>

### new InvalidReturnValueError(funcName, value, reason)

| Param | Type | Description |
| --- | --- | --- |
| funcName | <code>string</code> | The name of the function returning the invalidity. |
| value | <code>unknown</code> | The actual invalid value returned. |
| reason | <code>string</code> | The reason for invalidity. |

<a name="InvalidReturnTypeError"></a>

## InvalidReturnTypeError
Thrown in case a function does not return an expected value type on
execution, such as when a function is expected to return a promise.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1201-L1210

<a name="new_InvalidReturnTypeError_new"></a>

### new InvalidReturnTypeError(funcName, expected, value)

| Param | Type | Description |
| --- | --- | --- |
| funcName | <code>string</code> | The name of the function returning the invalidity. |
| expected | <code>Array.&lt;string&gt;</code> \| <code>string</code> | The return type(s) expected. |
| value | <code>unknown</code> | The actual value of invalid type returned. |

<a name="InvalidArgsNumberError"></a>

## InvalidArgsNumberError
Thrown in case the number of arguments passed to a function is invalid.

**Kind**: global class  
<a name="new_InvalidArgsNumberError_new"></a>

### new InvalidArgsNumberError(funcName, expected, value)

| Param | Type | Description |
| --- | --- | --- |
| funcName | <code>string</code> | The name of the function in question. |
| expected | <code>number</code> | The number of arguments expected to be passed. |
| value | <code>number</code> | The actual number of arguments passed. |

<a name="MissingOptionError"></a>

## MissingOptionError
For APIs that accept options objects, some options might be mandatory. This
error is thrown if a required option is missing.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_MISSING_OPTION
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1294

<a name="new_MissingOptionError_new"></a>

### new MissingOptionError(optName)

| Param | Type | Description |
| --- | --- | --- |
| optName | <code>string</code> | The missing option name. |

<a name="MissingArgsError"></a>

## MissingArgsError
Thrown in case a required argument of an API was not passed.

This is only used for strict compliance with the API specification (which in
some cases may accept `func(undefined)` but not `func()`). In most native
Node.js APIs, `func(undefined)` and `func()` are treated identically, and the
`ERR_INVALID_ARG_TYPE` error code may be used instead.

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_MISSING_ARGS
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1268-L1293

<a name="new_MissingArgsError_new"></a>

### new MissingArgsError(...args)

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;string&gt;</code> | The missing argument names. |

<a name="UnhandledErrorError"></a>

## UnhandledErrorError
Thrown in case an unhandled error occurred (for instance, when an 'error'
event is emitted by an EventEmitter without an 'error' handler registered).

**Kind**: global class  
**See**

- https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR
- https://github.com/nodejs/node/blob/8c9dc4e9e65af92c9b66bbbe1b001430d9110cd9/lib/internal/errors.js#L1454-L1461


---

&copy; OpenINF
