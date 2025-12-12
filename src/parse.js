const { tokenizer } = require('./tokenizer');
const { createParser } = require('./parser');

function parse(jsonString) {
    const tokens = tokenizer(jsonString);
    const parser = createParser(tokens);
    return parser.parseValue();
}

module.exports = { parse };