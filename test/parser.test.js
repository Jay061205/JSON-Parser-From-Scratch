const { tokenizer } = require('../src/tokenizer');
const { createParser } = require('../src/parser');


test("parses a simple object", () => {
    const tokens = tokenizer('{"a":1}');
    const parser = createParser(tokens);

    const result = parser.parseValue();

    expect(result).toEqual({a:1});
})

test("parses a simple array",() => {
    const tokens = tokenizer('[1,2,3,4]');
    const parser = createParser(tokens);

    const result = parser.parseValue();

    expect(result).toEqual([1,2,3,4]);
})


test("throws an expected error", () => {
    expect(() => {
        const tokens = tokenizer('{a:1}');
        const parser = createParser(tokens);

        const result = parser.parseValue();
    }).toThrow();
})


test("Parses a nested objects and more",() => {
    const tokens = tokenizer('[{"john":50,"jay":51},{"jude":52},{}]')
    const parser = createParser(tokens);

    const result = parser.parseValue();

    expect(result).toEqual([
        {
            "john": 50,
            "jay": 51
        },
        {
            "jude": 52
        },
        {}
    ])
})

test("Parses a nested arrays + objects", () => {
    const tokens = tokenizer('[{"a":1},[1,2,3]]');
    const parser = createParser(tokens);

    const result = parser.parseValue();

    expect(result).toEqual([
        {
            "a":1
        },
        [1,2,3]
    ])
})


test("parses decimal numbers", () => {
    const tokens = tokenizer('{"a":12.5}');
    const parser = createParser(tokens);

    const result = parser.parseValue();

    expect(result).toEqual({"a":12.5})
})

test("parses decimal numbers", () => {
    const tokens = tokenizer('{"a":-3.14}');
    const parser = createParser(tokens);

    const result = parser.parseValue();

    expect(result).toEqual({"a":-3.14})
})

test("parses exponent numbers", () => {
    const t1 = tokenizer('{"a":1e5}');
    const t2 = tokenizer('{"b":3E3}');
    const t3 = tokenizer('{"c":2.5e2}');
    const t4 = tokenizer('{"d":-4.2e-3}');
    const p1 = createParser(t1);
    const p2 = createParser(t2);
    const p3 = createParser(t3);
    const p4 = createParser(t4);

    const r1 = p1.parseValue();
    const r2 = p2.parseValue();
    const r3 = p3.parseValue();
    const r4 = p4.parseValue();

    expect(r1).toEqual({"a":100000})
    expect(r2).toEqual({"b":3000})
    expect(r3).toEqual({"c":250})
    expect(r4).toEqual({"d":-0.0042})
})


test("Parses the escape strings too", () => {
    const tokens = tokenizer('"Hello\\nWorld"');
    const parser = createParser(tokens);

    expect(parser.parseValue()).toBe("Hello\nWorld");
})