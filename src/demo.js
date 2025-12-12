const fs = require('fs');
const path = require('path');
const { parse } = require('./parse');


console.log(parse('{"a":1, "b":[1,2,3]}'));
console.log();

const filepath = path.join(__dirname, "demo.json");

const jsonText = fs.readFileSync(filepath,"utf-8");

const result = parse(jsonText);


console.log(result);