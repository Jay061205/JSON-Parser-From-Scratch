const { add } = require('../src/example')
 
test('add two nums', () => {
    expect(add(2,3)).toBe(5);
});