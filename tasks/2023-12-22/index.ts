// Tutaj skopiuj kod zadania
interface IPlugin {
    modifyText: (text: string) => string;
}

type AVAILABLE_PLUGINS = RemoveWordsPlugin | ReplaceCharsPlugin | MarkdownToHtmlPlugin;
export interface TextProcessingPlugin {
    use: (plugin: AVAILABLE_PLUGINS) => void;
    process: (text: string) => string;
}

export class TextProcessor implements TextProcessingPlugin {
    private plugins: Array<AVAILABLE_PLUGINS>
    constructor(){
        this.plugins = [];
    }
    use(plugin: AVAILABLE_PLUGINS){
        this.plugins.push(plugin);
    };
    process(text: string): string{
        if(!text) return '';
        const formattedText = this.plugins.reduce((processedText, plugin) => {
            return plugin.modifyText(processedText);
        }, text);

        return formattedText;
    };
}

export class RemoveWordsPlugin implements IPlugin{
    blackList: string[];
    constructor(forbiddenWords: string[]){
        this.blackList = forbiddenWords;
    }
    modifyText(text: string): string {
        const textChunks = text.split(' ');
        let modifiedText = text;
        this.blackList.forEach(blackWord => {
            modifiedText = modifiedText.replace(/\b\w+\b/g, word => word.replace(blackWord, ''))
        })
        modifiedText = modifiedText.replace(/\s+/g, ' ');
        return modifiedText;
    };
}

export class ReplaceCharsPlugin implements IPlugin {
    replacementChars: Record<string, string>
    constructor(letters: Record<string, string>){
        this.replacementChars = letters
    }
    
    modifyText(text: string): string {
        const extractedWords = text.split(' ');
        const transformedText: string[] = [];
        extractedWords.forEach(word => {
            let wordToCheck = word;
            for(const [key , value] of Object.entries(this.replacementChars)){
                wordToCheck = wordToCheck.replace(new RegExp(key, 'g'), value);
            }
            transformedText.push(wordToCheck);
        });
    
        return transformedText.join(' ');
    };
}

export class MarkdownToHtmlPlugin implements IPlugin {
    modifyText(text: string): string {
        let trimmedText = text;

        trimmedText = trimmedText.replace(/^#\s(.+)$/gm, '<h1>$1</h1>');
        trimmedText = trimmedText.replace(/^##\s(.+)$/gm, '<h2>$1</h2>');
        trimmedText = trimmedText.replace(/^###\s(.+)$/gm, '<h3>$1</h3>'); 
        // Convert lists
        trimmedText = trimmedText.replace(/^\*\s(.+)$/gm, '<li>$1</li>');
        trimmedText = trimmedText.replace(/(<li>.+<\/li>)/g, '<ul>$1</ul>');
      
        // Convert **word** to <strong>word</strong>
        trimmedText = trimmedText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      
        return trimmedText;
    };
}

function divideText(text: string){
    const transformedText = text.split(' ').map(word => {
        if(word.includes('.')) return [...word.split('.'),'.'];
        return word;
    });
}