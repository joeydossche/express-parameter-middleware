module.exports = {
    Name: 'TextOnly',
    Validate: (value) => {
        const lettersOnlyRe = /^[A-Za-z]+$/;
        return (lettersOnlyRe.test(value));
    }
}