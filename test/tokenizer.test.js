const { tokenizer } = require('../src/tokenizer');

// Test 1
test("Tokenizes simple objects", () => {
    const tokens = tokenizer('{"a":1}');
    const types = tokens.map((t) => t.type);


    expect(types).toEqual(['{','STRING',':','NUMBER','}','EOF']);
})

// Test 2
test("tokenizes literals", () => {
    const tokens = tokenizer("[true,false,null]");
    const types = tokens.map(t => t.type);

    expect(types).toEqual(['[','TRUE',',','FALSE',',','NULL',']','EOF']);
})

// Test 3
test("tokenizes strings", () => {
    const tokens = tokenizer('"Hello"');
    expect(tokens[0]).toMatchObject({type: 'STRING', value: 'Hello'});
})

// Test 4
test("Tokenizes numbers", () => {
    const tokens = tokenizer('42');  // You know why 42
    expect(tokens[0]).toMatchObject({type: 'NUMBER', value: 42});
})

// Test 5
test("Throws an error on invalid character", () => {
    expect(() => tokenizer('@')).toThrow()
})