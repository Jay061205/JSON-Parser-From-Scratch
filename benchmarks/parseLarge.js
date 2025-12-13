const parse = require("../src/parse");

// Large JSON input
const json = JSON.stringify({
  records: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `user_${i}`,
    active: i % 2 === 0,
    scores: Array.from({ length: 50 }, (_, j) => j + i),
    profile: {
      age: 18 + (i % 40),
      country: "IN",
      preferences: {
        theme: "dark",
        notifications: true,
        tags: ["json", "parser", "benchmark", "node"]
      }
    },
    history: Array.from({ length: 10 }, (_, k) => ({
      year: 2010 + k,
      value: i * k
    }))
  }))
});

// Fewer runs for large input
const runs = 100;

// warmup
for (let i = 0; i < 20; i++) {
  parse(json);
}

const start = process.hrtime.bigint();

for (let i = 0; i < runs; i++) {
  parse(json);
}

const end = process.hrtime.bigint();

const totalMs = Number(end - start) / 1e6;
const avgMs = totalMs / runs;

console.log("Large JSON benchmark");
console.log(`Runs: ${runs}`);
console.log(`Total time: ${totalMs.toFixed(3)} ms`);
console.log(`Average per run: ${avgMs.toFixed(6)} ms`);
