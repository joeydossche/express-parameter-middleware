module.exports = {
    Name: 'String',
    Validate: (value) => {
        const stringRe = /^(?:(?![×Þß÷þø])[-a-zA-ZÀ-ÿ.]|^)$/;
        return (stringRe.test(value));
    }
}
