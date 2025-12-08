function createParser(tokens){
    let pos = 0;

    const current = () => tokens[pos];
    const consume = () => tokens[pos++];
    const expect = (type) => {
        if(current().type !== type){
            throw new Error(`Expected type: ${type}, resulting type: ${current().type}`)
        }
        return consume();
    }

    const parseValue = () => {
        const toks = current();

        if(toks.type === '{') return parseObject();
        if(toks.type === '[') return parseArray();

        if(toks.type === 'STRING') return consume().value;
        if(toks.type === 'NUMBER') return consume().value;
        
        if(toks.type === 'TRUE') { consume(); return true };
        if(toks.type === 'FALSE') { consume(); return false };
        if(toks.type === 'NULL') { consume(); return null };

        throw new Error(`Unexpected token: ${toks.type}`);
    }

    const parseObject = () => {
        const obj = {};
        expect('{');

        if(current().type === "}"){
            consume();
            return obj; // Empty object
        }

        while(true){
            const keyTokens = current();
            if(keyTokens.type !== "STRING"){
                throw new Error(`Expected STRING key, got ${keyTokens.type}`)
            }
            const key = consume().value;

            expect(":");

            const value = parseValue();
            obj[key] = value;


            if (current().type === "}"){
                consume();
                return obj;
            }
            expect(",");
        }
    }



    const parseArray = () => {
        const arr = [];
        expect('[');

        if (current().type === ']'){
            consume();
            return arr;
        }

        while(true){
            const value = parseValue();
            arr.push(value);

            if(current().type === ']'){
                consume();
                return arr;
            }
            expect(',')
        }
    };



    return { current,consume,expect,parseValue,parseObject,parseArray,posRef: () => pos };
}



module.exports = { createParser };
