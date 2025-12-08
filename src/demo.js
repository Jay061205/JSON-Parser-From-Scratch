const { tokenizer } = require('./tokenizer');
const { createParser } = require('./parser');

// const tokens = tokenizer('{"a":1,"b":true}');
// const parser = createParser(tokens);

// console.log(parser.parseValue());

console.log(createParser(tokenizer('[1,2,3]')).parseValue());
console.log(createParser(tokenizer('["a",true,null]')).parseValue());
console.log(createParser(tokenizer('[{"x":10}, [1,2]]')).parseValue());
