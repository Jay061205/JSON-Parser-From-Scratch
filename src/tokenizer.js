function tokenizer(input){
    const tokens = []
    const len = input.length;
    let i = 0;

    while (i < len){
        const ch = input[i];

        // Removing WhiteSpaces
        if(/\s/.test(ch)){
            i++;
            continue;
        }
        // Including any brackets and symbols like {}[] and :
        if("{}[]:,".includes(ch)){
            if(ch !== ""){
                tokens.push({
                    type: ch,
                    value: ch,
                    pos: i,
                });
            }
            i++;
            continue;
        }

        // Including the strings
 if (ch === '"') {
            let start = i;
            i++; 
            let value = "";

            while (i < len) {
                const c = input[i];

                // End of string
                if (c === '"') {
                    i++;
                    break;
                }

                // Escape sequences
                if (c === '\\') {
                    i++;
                    const esc = input[i];

                    if (esc === '"') value += '"';
                    else if (esc === '\\') value += '\\';
                    else if (esc === '/') value += '/';
                    else if (esc === 'b') value += '\b';
                    else if (esc === 'f') value += '\f';
                    else if (esc === 'n') value += '\n';
                    else if (esc === 'r') value += '\r';
                    else if (esc === 't') value += '\t';
                    else {
                        throw new Error(`Invalid escape sequence \\${esc} at position ${i}`);
                    }

                    i++;
                    continue;
                }

                // Normal character
                value += c;
                i++;
            }

            tokens.push({
                type: "STRING",
                value: value,
                pos: start,
            });

            continue;
        }

        // Including the Numbers
        if((ch >= '0' && ch <= '9') || ch === '-'){
            let start = i;
            let raw = "";

            // Negative integers
            if(ch === '-'){
                raw += '-';
                i++;
            }

            // integers part
            while (i<len && input[i] >= '0' && input[i] <= '9'){
                    raw += input[i];
                    i++;
                }

                if(i<len && input[i] === '.'){
                    raw += '.';
                    i++;


                    if(!(input[i] >= '0' && input[i] <= '9')){
                        throw new Error(`Invalid number at position ${start}`);
                    }

                    while(i < len && input[i] >= '0' && input[i] <= '9'){
                        raw += input[i];
                        i++;
                    }
                }
            

                if(i<len && (input[i] === 'e' || input[i] === 'E')){
                    raw += input[i];
                    i++;

                    if(input[i] === '+' || input[i] === '-'){
                        raw += input[i];
                        i++;
                    }

                    if(!(input[i] >= '0' && input[i] <= '9')){
                        throw new Error(`Invalid exponent at position ${start}`);
                    }

                    while(i<len && input[i] >= '0' && input[i] <= '9'){
                        raw += input[i];
                        i++;
                    }
                }

            const value = Number(raw);
            tokens.push({
                type: "NUMBER",
                value: value,
                pos: start,
            })
            continue;
        }

        // Including the Booleans
        if(input.startsWith("true",i)){
            tokens.push({
                type: "TRUE",
                value: true,
                pos: i
            })
            i += 4;
            continue;
        }
        
        if(input.startsWith("false",i)){
            tokens.push({
                type: "FALSE",
                value: false,
                pos: i
            })
            i += 5;
            continue;
        }
        

        // Including the Null values
        if(input.startsWith("null",i)){
            tokens.push({
                type: "NULL",
                value: null,
                pos: i
            })
            i += 4;
            continue;
        }


        throw new Error(`Unhandled character '${ch}' at position ${i}`);
    }

    tokens.push({type: "EOF",pos: i})

    return tokens;
}

module.exports = { tokenizer }


