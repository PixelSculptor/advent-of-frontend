// Tutaj skopiuj kod zadania
const WORLD_MAP = ['North Pole', 'London', 'Paris', 'Berlin', 'Madrid', 'New York'];

export function findCyclesBetweenLocations(graph: Record<string, string[]>): string[][] {
    const listOfCities = Object.keys(graph);
    if(!checkMapOfCities(listOfCities)) throw new Error('Invalid graph: missing nodes');
    
    const cycleList: string[][] = [];
    const visited: string[] = [];
    
    for(const vertex of listOfCities){
        if(!visited.includes(vertex)){
            depthFirstSearch(vertex, visited, cycleList, graph, [vertex]);
        }
    }
   
    return cycleList;
}

function depthFirstSearch(vertex: string, visited: string[], cycleList: string[][], graph: Record<string, string[]>, dfstree: string[]){
    visited.push(vertex);
    const destinations = graph[vertex] || [];
    
    for(const destination of destinations){
        if(visited.includes(destination)){
            // cycle was found
            const cycle = [...dfstree.splice(dfstree.indexOf(destination)), destination];
            cycleList.push(cycle);
            return;
        }else{
            depthFirstSearch(destination, visited, cycleList, graph, [...dfstree, destination]);
        }
    }
}

function checkMapOfCities(cities: string[]): boolean {
    return WORLD_MAP.every((element, index) => element === cities[index]);
}
