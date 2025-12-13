const parse = require('../src/parse');

const json = '{"a":1,"b":true,"c":[1,2,3],"d":{"x":10}}';

// Number of times the process repeats
const runs = 10000;

// warmup
for(let i = 0; i<1000;i++){
    parse(json);
}

const start = process.hrtime.bigint();

for(let i = 0; i<runs;i++){
    parse(json);
}

const end = process.hrtime.bigint();

const totalMs = Number(end - start)/1e6;
const avgMs = totalMs/runs;

console.log("Small JSON benchmark");
console.log(`Runs: ${runs}`);
console.log(`Total time: ${totalMs.toFixed(3)} ms`);
console.log(`Average per run: ${avgMs.toFixed(6)} ms`);