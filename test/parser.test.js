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