const parse = require('../src/parse');

const json = JSON.stringify({
  users: Array.from({ length: 100 }, (_, i) => ({
    id: i,
    name: `user_${i}`,
    active: i % 2 === 0,
    scores: Array.from({ length: 20 }, (_, j) => j * i),
    profile: {
      age: 20 + (i % 10),
      country: "IN",
      meta: {
        verified: i % 3 === 0,
        tags: ["json", "parser", "benchmark"]
      }
    }
  }))
});

// Number of times the process repeats
const runs = 2000;

// warmup
for(let i = 0; i<500;i++){
    parse(json);
}

const start = process.hrtime.bigint();

for(let i = 0; i<runs;i++){
    parse(json);
}

const end = process.hrtime.bigint();

const totalMs = Number(end - start)/1e6;
const avgMs = totalMs/runs;

console.log("Medium JSON benchmark");
console.log(`Runs: ${runs}`);
console.log(`Total time: ${totalMs.toFixed(3)} ms`);
console.log(`Average per run: ${avgMs.toFixed(6)} ms`);