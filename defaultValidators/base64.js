module.exports = {
    Name: 'Base64',
    Validate: (value, propName) => {
        const base64Re = /^[a-zA-z0-9\-_]*$/;
        return (base64Re.test(value));
    }
}