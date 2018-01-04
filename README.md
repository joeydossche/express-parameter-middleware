# Express Query Parameter Middleware
This is a tool to use as a __middleware__ to check the (query) parameter input from an HTTP request in express.

## How to use

### Install query parameter middleware

```bash
npm install express-parameter-middleware --save
``` 


### Importing the express parameter middleware into your project

You need different imports to use this middleware. We recommend you to use different variables.

```js
const EPM = require('express-parameter-middleware');
const Parameter = EPM.Parameter;
const CheckParameters = EPM.CheckParameters;
const Validators = EPM.Validators;
```

### Using the middleware
First, you need to initialize the different parameters you want to check. This is possible to create a __array__ of objects _(each object represents a parameter)_.

```js
const Parameters = [
    new Parameter(
        "limit",
        Number,
        [Validators.Number],
        true
    ),
    new Parameter(
        "offset",
        Number,
        [Validators.Number],
        true
    )
];
```

Then create a new object of the `CheckParameters` class and insert the __Parameters__ as property:

```js
const LimitAndOffset = new CheckParameters(Parameters);
```

After this step, you are ready to use it as middleware. Just enter __the kind of Check__ you want to do after your object and done.

```js
app.get('/', LimitAndOffset.CheckQueryParam, function (req, res) {
    res.status(200).send('ok');
});
```
```http
http://example.com/?limit=10&offset=10
```

__or:__

```js
app.get('/:limit/:offset', LimitAndOffset.CheckParam, function (req, res) {
    res.status(200).send('ok');
});
```
```http
http://example.com/10/10
```


### Custom Validator
You can initialinize your own Validators:

```js
CustomValidator(/regular expression/ , 'Name');
```

By example:


```js
CustomValidator(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/ , 'IP');
```
You can use this Validator just like you would use another one `Validator.IP`.

## API

### Parameter options
- `name`: No default value, any clean string;
- `type`: undefined as default
    - `String`
    - `Number`
    - `Boolean`
    - `Symbol`
    - `null`
    - `Date`
    - `Object`
    - `undefined`
    - `any`
- `validator`: array of possible validators
    - `Validator.Base64`
    - `Validator.DateTime`
    - `Validator.Email`
    - `Validator.Number`
    - `Validator.String`
    - `Validator.TextOnly` (only text, no numbers)
    - `Validator.{YourCustomValidator}` (This is a self made validator, __see Custom Validator__)
- `required`: false by default
    - `true`
    - `false`

### CheckParameter options
- `CheckParam`: checks the params in the request
- `CheckQueryParam`: checks the query params in the request