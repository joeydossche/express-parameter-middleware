module.exports = {
    Name: 'DateTime',
    Validate: (value) => {
        const dateTimeRe = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        return (dateTimeRe.test(value));
    }
}