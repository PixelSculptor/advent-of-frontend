// Tutaj skopiuj kod zadania
export interface WeightedGraph {
    [key: string]: { [key: string]: number };
  }
  
  export function findShortestPath(graph: WeightedGraph, startNode: string, endNode: string): string[] | null {
    // return []
    if(!isCityOnMap(graph, startNode, endNode)) throw new Error('Invalid or non-existent route');
    return [];
}


function isCityOnMap(grpah: WeightedGraph, startNode: string, endNode: string){
    const cities = Object.keys(grpah);
    return cities.includes(startNode) && cities.includes(endNode);
}