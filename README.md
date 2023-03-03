<div align="center">

# @openinf/util-errors

Essential utility errors inspired by Node.js core error codes

<br />

[!['View on npm'][npm-badge--shields]][npm-badge-url]
[!['DeepScan grade'][deepscan-badge]][deepscan-url]
[!['License: MIT'][license-badge--shields]][license-badge-url]

</div>

<br />

_The high-level goal of `@openinf/util-errors` is to serve as a Node.js package
containing **essential utility error classes** that take the form of those found
and used in Node.js core. As is the case with any software project in continuous
development, omissions and errors may exist, for which [contributions are
welcome](#contributing)._

<br />

<details id="platform--node-js-lts">
	<summary>
		<a
			href="#platform--node-js-lts"
			title="Platform: Node.js LTS"
		>
			<img
				src="https://img.shields.io/badge/Node.js-LTS-black?logo=Node.js&logoColor=lightgreen&color=2a2a2a&labelColor=black"
				alt="Platform: Node.js LTS"
			/>
		</a>
	</summary>
	<div align="left"><br />
		<a
			target="_blank"
			title="Node.js release schedule"
			href="https://github.com/nodejs/release#release-schedule"
		>
			<strong>Supported Node.js Environments</strong>
		</a><br /><br />

- [ ] v4：Argon (Ar)
- [ ] v6：Boron (B)
- [ ] v8：Carbon (C)
- [ ] v10：Dubnium (Db)
- [ ] v12：Erbium (Er)
- [x] v14：Fermium (Fm)
- [x] v16：Gallium (Ga)
- [x] v18：Hydrogen (H)
<!-- TODO
- [x] v20: Iron (Fe) -->

</div></details>

<br />

<div align="center">

[![Code Style: Prettier][prettier-badge]][prettier-url]
[![Commit Style: Conventional Commits][conventional-commits-badge]][conventional-commits-url]
[![Active Issues: DeepSource][deepsource-badge]][deepsource-url]
[![Chat on Matrix][matrix-badge--shields]][matrix-url]

</div>

<br />

---

<br />

## Installation

`@openinf/util-errors` runs on
[supported versions of Node.js](#platform--node-js-lts) and is available via
**`npm`**, **`pnpm`**, or **`yarn`**.

**Using the npm CLI**

<sup>See the
[official documentation for this command](https://docs.npmjs.com/cli/commands/npm-install)
for more information.</sup>

```shell
npm i @openinf/util-errors
```

**Using the pnpm CLI**

<sup>See the
[official documentation for this command](https://pnpm.io/cli/install) for more
information.</sup>

```shell
pnpm i @openinf/util-errors
```

**Using the Yarn 1 CLI (Classic)**

<sup>See the
[official documentation for this command](https://classic.yarnpkg.com/en/docs/cli/add)
for more information.</sup>

```shell
yarn add @openinf/util-errors
```

## Usage

To get started using the error classes provided by `@openinf/util-errors`, all
that needs to be done is either import/require (depending on the module format)
the default export of the module or destructure the individual named error
classes exported.

```ts
import { hasOwn } from '@openinf/util-object';
import { MissingOptionError } from '@openinf/util-errors';
import infLog from '@openinf/inf-log';

function getLogger(logger, opts) {
  if (!hasOwn(opts, 'scope')) {
    throw new MissingOptionError('scope');
  }

  return new logger(opts);
}

const log = getLogger(infLog, infLog.defaultOpts);

log.info('Hello, World!');
```

**Note:** The example above does not demonstrate how to properly handle this error
  once thrown and would likely result in an uncaught exception.

**Note:** If you are in an environment where the CommonJS module loader
  (`require()`) is available, destructuring the individual error classes works
  just as well.

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
**See**: https://nodejs.org/api/errors.html#ERR_INVALID_ARG_VALUE  
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
**See**: https://nodejs.org/api/errors.html#ERR_INVALID_ARG_TYPE  
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
**See**: https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY  
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
**See**: https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_PROPERTY_VALUE  
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
**See**: https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE  
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
**See**: https://nodejs.org/api/errors.html#ERR_INVALID_RETURN_VALUE  
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
**See**: https://nodejs.org/api/errors.html#ERR_MISSING_OPTION  
<a name="new_MissingOptionError_new"></a>

### new MissingOptionError(optName)

| Param | Type | Description |
| --- | --- | --- |
| optName | <code>string</code> | The name of the missing option. |

<a name="MissingArgsError"></a>

## MissingArgsError
Thrown in case a required argument of an API was not passed.

This is only used for strict compliance with the API specification (which in
some cases may accept `func(undefined)` but not `func()`). In most native
Node.js APIs, `func(undefined)` and `func()` are treated identically, and the
`ERR_INVALID_ARG_TYPE` error code may be used instead.

**Kind**: global class  
**See**: https://nodejs.org/api/errors.html#ERR_MISSING_ARGS  
<a name="new_MissingArgsError_new"></a>

### new MissingArgsError(...args)

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;string&gt;</code> | The names of the missing arguments. |

<a name="UnhandledErrorError"></a>

## UnhandledErrorError
Thrown in case an unhandled error occurred (for instance, when an 'error'
event is emitted by an EventEmitter without an 'error' handler registered).

**Kind**: global class  
**See**: https://nodejs.org/api/errors.html#ERR_UNHANDLED_ERROR  

<br /><br />

---

<br />

<div align="center">

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

<br />

## Show Your Support

<!-- Give a ⭐️ if this project helped you! -->

If you like the project or want to bookmark it, [give it a star ⭐️]; it will
greatly encourage us.

<br /><br />

&copy; The OpenINF Authors

<br /><br />

<a title="The OpenINF website" href="https://open.inf.is" rel="author">
  <img alt="The OpenINF logo" height="32px" width="32px" src="https://raw.githubusercontent.com/openinf/openinf.github.io/live/logo.svg?sanitize=true" />
</a>

</div>

[deepscan-badge]: https://badgen.net/deepscan/grade/team/18447/project/21800/branch/634011?icon=deepscan 'DeepScan grade'
[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=18447&pid=21800&bid=634011 'DeepScan grade'
[deepsource-badge]: https://deepsource.io/gh/openinf/openinf-util-errors.svg/?label=active+issues&show_trend=true&token=iF1YS-_ZSGmlibarZ1ItKO9o
[deepsource-url]: https://deepsource.io/gh/openinf/openinf-util-errors/?ref=repository-badge 'Active Issues: DeepSource'
[conventional-commits-badge]: https://img.shields.io/badge/commit%20style-Conventional-%23fa6673?logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggc3R5bGU9ImZpbGw6ICNGRkYiIGQ9Ik0xNSwyQTEzLDEzLDAsMSwxLDIsMTUsMTMsMTMsMCwwLDEsMTUsMm0wLTJBMTUsMTUsMCwxLDAsMzAsMTUsMTUsMTUsMCwwLDAsMTUsMFoiLz48L3N2Zz4K 'Commit Style: Conventional Commits'
[conventional-commits-url]: https://www.conventionalcommits.org 'Commit Style: Conventional Commits'
[give it a star ⭐️]: https://github.com/OpenINF/openinf-util-errors/stargazers
[license-badge--shields]: https://img.shields.io/badge/license-MIT-blue.svg?logo=github 'License: MIT'
[license-badge-url]: https://spdx.org/licenses/MIT.html 'License: MIT'
[matrix-badge--shields]: https://img.shields.io/badge/matrix-join%20chat-%2346BC99?logo=matrix 'Chat on Matrix'
[matrix-url]: https://matrix.to/#/#openinf:matrix.org 'You&apos;re invited to talk on Matrix'
[npm-badge--shields]: https://img.shields.io/npm/v/@openinf/util-errors/latest.svg?logo=npm&color=fe7d37 'View on npm'
[npm-badge-url]: https://www.npmjs.com/package/@openinf/util-errors#top 'View on npm'
[prettier-badge]: https://img.shields.io/badge/code_style-Prettier-ff69b4.svg?logo=prettier 'Code Style: Prettier'
[prettier-url]: https://prettier.io/playground 'Code Style: Prettier'
