// Tutaj skopiuj kod zadania
export interface WeightedGraph {
    [key: string]: { [key: string]: number };
}

type AVAILABLE_CITIES = 'London' | 'Paris' | 'Tokyo' | 'Berlin' | 'Beijing' | 'Frankfurt' | "";

type City = {
    city: AVAILABLE_CITIES,
    distanceToCity: number,
    previousCity: AVAILABLE_CITIES
}

type QueueToCheck = City[];

export function findShortestPath(graph: WeightedGraph, startNode: string, endNode: string): string[] | null {
    // return []
    if(!isCityOnMap(graph, startNode, endNode)) throw new Error('Invalid or non-existent route');
    const rawCitiesData = queueToTraverse(graph);

    return [];
}


function isCityOnMap(grpah: WeightedGraph, startNode: string, endNode: string){
    const cities = Object.keys(grpah);
    return cities.includes(startNode) && cities.includes(endNode);
}

function dijkstra(graph: WeightedGraph, startNode: string): string[]{



    return []
}

function queueToTraverse(graph: WeightedGraph): QueueToCheck {
    const cities = Object.keys(graph);
    const queueToTraverse: QueueToCheck = [];
    cities.forEach(city => {
        queueToTraverse.push({
            city: city as AVAILABLE_CITIES,
            distanceToCity: Infinity,
            previousCity: ""
        });
    });
    return queueToTraverse;
}