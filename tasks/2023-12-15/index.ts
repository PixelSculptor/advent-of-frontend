// Tutaj skopiuj kod zadania
export function* storageQuery(range: number, gift: string, resolver: (n: number, gift: string) => boolean): Generator<number> {
    for(let i=gift.length; i<=range; i++){
        if(resolver(i,gift)) yield i;
    }
}

export function storageResolver(n: number, gift: string): boolean {
    return n % gift.length === 0;
}
