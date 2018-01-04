module.exports = {
    Name: 'Number',
    Validate: (value) => {
        const numbersOnlyRe = /^[0-9]+$/;
        return (numbersOnlyRe.test(value));
    }
}