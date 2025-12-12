function syntaxError(message,tokens,pos){
    const tok = tokens[pos];
    const near = tokens
    .slice(Math.max(0,pos -2),pos + 3)
    .map(t => t.value)
    .join(" ");

    return new Error(`${message} at position ${tok.pos}\n near: ${near}`);
}


function createParser(tokens){
    let pos = 0;

    const current = () => tokens[pos];
    const consume = () => tokens[pos++];
    const expect = (type) => {
        if(current().type !== type){
            throw syntaxError(`Expected '${type}', got '${current().type}'`,tokens,pos);
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

        throw syntaxError(`Unexpected token '${toks.type}'`, tokens, pos);
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
                throw syntaxError(`Expected STRING key, got '${keyTokens.type}'`, tokens, pos);
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
