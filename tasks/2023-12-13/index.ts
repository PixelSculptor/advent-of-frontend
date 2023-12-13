export function decodeMessage(template: string, values: Record<string, string>): string {

    const pattern = /{{\s*([^}]+)\s*}}/g;
    if(!Object.keys(values).length) return template.replace(pattern, '');

    for(const [wordTemplate, encodedValue] of Object.entries(values)){
        const extractedData = encodedValue.split(':');
        if(!checkDecodeMethod(extractedData[0])) return template.replace(pattern, '');
        values[wordTemplate] = decoder(extractedData[1], extractedData[0])
    };
    const replacedString = template.replace(pattern, (match, wordTemplate) => {
        const replacement = values[wordTemplate.trim()];
        return replacement !== undefined ? replacement : match;
    });

    return replacedString
}

type Format = 'b64' | 'c13' | 'uri';

function decoder(word:string, format: string): string {
    switch(format){
        case 'b64':
            return Buffer.from(word, 'base64').toString('ascii');
        case 'c13':
            return decodeCeasar(word);
        case 'uri':
            return decodeURI(word);
    }

    throw new Error('Cannot decode properly');
}

function decodeCeasar(word:string, shift:number = 13){
    const decoded: string[] = [];
    word.toUpperCase();
    for(const letter of word){
        const decodedLetter = String.fromCharCode(((letter.toUpperCase().charCodeAt(0)-shift + 65) % 26 + 65)).toLowerCase();
        decoded.push(decodedLetter);
    }
    return decoded.join('');
}

function decodeURI(uri: string){
    return decodeURIComponent(uri);
}

function checkDecodeMethod(value: string):value is Format{
    const ALLOWED_METHODS: Format[] = ['b64', 'c13', 'uri'];
    return ALLOWED_METHODS.includes(value as Format);
}
