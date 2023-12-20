// Tutaj skopiuj kod zadania

interface IGiftStream {
    stream: string[],
    mappedGifts: string[];
    map: (callback: (value: string) => string) => this;
    skip: (offset: number) => this;
    take: (count: number) => this;
    getGifts: () => string[];
}
export class GiftStream implements IGiftStream{
    stream: string[];
    mappedGifts: string[];

    constructor(_stream: string[]){
        this.stream = _stream;
        this.mappedGifts = [];
    }

    map(callback: (value: string) => string):this {
        if(this.stream.length !== 0 ){
            this.mappedGifts = this.stream.map(callback);
        }
        return this;
    }

    skip(offset: number):this {
        if(this.stream.length <= offset){
            this.mappedGifts = [];
        }
        this.mappedGifts = this.mappedGifts.slice(offset);
    
        return this;
    };

    take(count: number): this {
        if(this.mappedGifts.length < count){
            this.mappedGifts = [];
        }
        this.mappedGifts = this.mappedGifts.slice(0, count);
        return this;
    };

    getGifts(): string[] {
        return this.mappedGifts;
    };
}