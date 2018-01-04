let DefaultValidators = [];
let Validator;
       
Validator = require('./base64');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./dateTime');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./email');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./textOnly');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./number');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./string');
DefaultValidators[Validator.Name] = Validator;

module.exports = DefaultValidators;