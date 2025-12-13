const parse = require("../src/parse");

// Same medium-sized JSON as before
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

const runs = 2000;

// Warmup
for (let i = 0; i < 500; i++) {
  parse(json);
  JSON.parse(json);
}

// Custom parser
let start = process.hrtime.bigint();

for (let i = 0; i < runs; i++) {
  parse(json);
}

let end = process.hrtime.bigint();
const customMs = Number(end - start) / 1e6;


// Native JSON.parse
start = process.hrtime.bigint();

for (let i = 0; i < runs; i++) {
  JSON.parse(json);
}

end = process.hrtime.bigint();
const nativeMs = Number(end - start) / 1e6;

// Results
console.log("JSON.parse vs Custom Parser (Medium JSON)");
console.log(`Runs: ${runs}`);
console.log("");
console.log(`Custom parser total: ${customMs.toFixed(3)} ms`);
console.log(`Custom avg/run:     ${(customMs / runs).toFixed(6)} ms`);
console.log("");
console.log(`Native total:       ${nativeMs.toFixed(3)} ms`);
console.log(`Native avg/run:     ${(nativeMs / runs).toFixed(6)} ms`);
console.log("");
console.log(
  `Native is ~${(customMs / nativeMs).toFixed(2)}x faster\n`
);
console.log(
  "Note: This benchmark is for learning purposes only.\n" +
  "The goal is to understand how parsing works internally,\n" +
  "not to compete with the native JSON.parse() implementation.\n"
);
