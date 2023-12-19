// Tutaj skopiuj kod zadania
export function usePagination<T>(items: T[], itemsPerPage: number, pageNumber: number) {
    let currentPageItems: T[] = [];
    const totalItems = items.length;

    if(pageNumber === 0) throw new Error('Page number cannot be less than 1');

    const totalPages = Math.ceil(items.length/pageNumber);

    if(pageNumber <= totalPages){
        currentPageItems = divIntoChunks(items, itemsPerPage)[pageNumber-1];
    }

    return { totalPages, currentPageItems, totalItems }
}

function divIntoChunks<T>(array: T[], chunkFactor: number): T[][]{
    let chunks = [];
    for(let i = 0; i < array.length; i += chunkFactor){
        chunks.push(array.slice(i, i+chunkFactor));
    }
    return chunks;
}