const DefaultValidators = require('./defaultValidators');

class Parameter {
    constructor(name, type = undefined, validator = [], required = false) {
        this._name = name;
        this._type = type;
        this._validator = validator;
        this._required = required;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get validator() {
        return this._validator;
    }

    get required() {
        return this._required;
    }
}

class CheckParameters {
    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;

    }
    constructor(parameters) {
        this._parameters = parameters;
        this.CheckQueryParam = this.CheckQueryParam.bind(this);
        this.CheckParam = this.CheckParam.bind(this);
    }

    CheckQueryParam (req, res, next) {
        let parameterChecks = this._parameters.map(param => { // TypeError: Cannot read property '_parameters' of undefined
            return new Promise((resolve, reject) => {
                if (param.required) {
                    if (!(req.query[param.name] === undefined)) {
                        if (_checkType(req.query[param.name], param.type)) {

                            _checkValidators(req.query[param.name], param.validator)
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(error => {
                                    reject(`The parameter ${param.name} is not conform with the validators.`);
                                })
                        } else {
                            reject(`The parameter ${param.name} is not defined as a ${param.type.name}.`);
                        }
                    } else {
                        reject(`The parameter ${param.name} is not defined as a query variable.`);
                    }
                } else {
                    if (!(req.query[param.name] === undefined)) {
                        if (_checkType(req.query[param.name], param.type)) {

                            _checkValidators(req.query[param.name], param.validator)
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(error => {
                                    reject(`The parameter ${param.name} is not conform with the validators.`);
                                })
                        } else {
                            reject(`The parameter ${param.name} is not defined as a ${param.type.name}.`);
                        }
                    } else {
                        resolve(true);
                    }
                }
            });
        });
        Promise.all(parameterChecks)
            .then(() => next())
            .catch((error) => {
                console.error(error);
                res.status(400).send(error)
            });

        function _checkType(valueToCheck, type) {
            if (type === 'any') {
                return true;
            }

            if (type === String) {
                return (typeof(valueToCheck) === 'string');
            }

            if (type === Number) {
                let parsed = parseInt(valueToCheck);
                if (isNaN(parsed)) {
                    return false;
                } else {
                    return (typeof(parsed) === 'number');
                }
            }

            if (type === Boolean) {
                return (typeof(valueToCheck) === 'boolean' || valueToCheck === 0 || valueToCheck === 1 || valueToCheck === "0" || valueToCheck === "1");
            }

            if (type === undefined) {
                return (valueToCheck === undefined);
            }

            if (type === Symbol) {
                return (typeof(valueToCheck) === 'symbol');
            }

            if (type === null) {
                return (valueToCheck === null);
            }

            if (type === Date) {
                return (valueToCheck instanceof Date);
            }

            if (type === Object) {
                return (typeof(valueToCheck) === 'object');
            }

        }

        function _checkValidators(valueToCheck, validators) {
            return new Promise((resolve, reject) => {
                let promises = validators.map(validator => {
                    return new Promise((resolve) => {
                        resolve((DefaultValidators[validator.Name].Validate(valueToCheck)));
                    });

                });
                Promise.all(promises)
                    .then((validate) => {
                        if (validate.every(function (value) {
                                return (value === true)
                            })) {
                            resolve(true);
                        } else {
                            reject(false)
                        }

                    })
                    .catch((error) => {
                        reject(error);
                    });
            })

        }
    }


    CheckParam(req, res, next) {
        let parameterChecks = this._parameters.map(param => {
            return new Promise((resolve, reject) => {
                if (param.required) {
                    if (!(req.params[param.name] === undefined)) {
                        if (_checkType(req.params[param.name], param.type)) {

                            _checkValidators(req.params[param.name], param.validator)
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(error => {
                                    reject(`The parameter ${param.name} is not conform with the validators.`);
                                })
                        } else {
                            reject(`The parameter ${param.name} is not defined as a ${param.type.name}.`);
                        }
                    } else {
                        reject(`The parameter ${param.name} is not defined as a query variable.`);
                    }
                } else {
                    if (!(req.params[param.name] === undefined)) {
                        if (_checkType(req.params[param.name], param.type)) {
                            _checkValidators(req.params[param.name], param.validator)
                                .then(result => {
                                    resolve(result);
                                })
                                .catch(error => {
                                    reject(`The parameter ${param.name} is not conform with the validators.`);
                                })
                        } else {
                            reject(`The parameter ${param.name} is not defined as a ${param.type.name}.`);
                        }
                    } else {
                        resolve(true);
                    }
                }
            });
        });
        Promise.all(parameterChecks)
            .then(() => next())
            .catch((error) => {
                console.error(error);
                res.status(400).send(error)
            });

        function _checkType(valueToCheck, type) {
            if (type === 'any') {
                return true;
            }

            if (type === String) {
                return (typeof(valueToCheck) === 'string');
            }

            if (type === Number) {
                let parsed = parseInt(valueToCheck);
                if (isNaN(parsed)) {
                    return false;
                } else {
                    return (typeof(parsed) === 'number');
                }
            }

            if (type === Boolean) {
                return (typeof(valueToCheck) === 'boolean' || valueToCheck === 0 || valueToCheck === 1 || valueToCheck === "0" || valueToCheck === "1");
            }

            if (type === undefined) {
                return (valueToCheck === undefined);
            }

            if (type === Symbol) {
                return (typeof(valueToCheck) === 'symbol');
            }

            if (type === null) {
                return (valueToCheck === null);
            }

            if (type === Date) {
                return (valueToCheck instanceof Date);
            }

            if (type === Object) {
                return (typeof(valueToCheck) === 'object');
            }

        }

        function _checkValidators(valueToCheck, validators) {
            return new Promise((resolve, reject) => {
                let promises = validators.map(validator => {
                    return new Promise((resolve) => {
                        resolve((DefaultValidators[validator.Name].Validate(valueToCheck)));
                    });

                });
                Promise.all(promises)
                    .then((validate) => {
                        if (validate.every(function (value) {
                                return (value === true)
                            })) {
                            resolve(true);
                        } else {
                            reject(false)
                        }

                    })
                    .catch((error) => {
                        reject(error);
                    });
            })

        }
    }
}

const AddToDefaultValidators = function (regex, validatorName) {
    DefaultValidators[validatorName] = {
        Name: validatorName,
        Validate: (value) => {
            return (regex.test(value));
        }
    }
};

module.exports = {
    Parameter: Parameter,
    CheckParameters: CheckParameters,
    Validators: DefaultValidators,
    CustomValidator: AddToDefaultValidators
};
