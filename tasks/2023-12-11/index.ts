// Tutaj skopiuj kod zadania
export interface WeightedGraph {
    [key: string]: { [key: string]: number };
}

type AVAILABLE_CITIES = 'London' | 'Paris' | 'Tokyo' | 'Berlin' | 'Beijing' | 'Frankfurt' | "";

type City = {
    city: AVAILABLE_CITIES,
    distanceToCity: number,
    previousCity: AVAILABLE_CITIES,
    checked: boolean
}

type QueueToCheck = City[];

export function findShortestPath(graph: WeightedGraph, startNode: AVAILABLE_CITIES, endNode: AVAILABLE_CITIES): string[] | null {
    // return []
    if(!isCityOnMap(graph, startNode, endNode)) throw new Error('Invalid or non-existent route');
    if(!checkConnections(graph, startNode, endNode)){
        return null;
    }
    
    const rawCitiesData = queueToTraverse(graph, startNode);

    const citiesQueue =  dijkstra(graph, rawCitiesData);
    

    return getPath(citiesQueue,endNode);
}


function isCityOnMap(grpah: WeightedGraph, startNode: AVAILABLE_CITIES, endNode: AVAILABLE_CITIES){
    const cities = Object.keys(grpah);
    return cities.includes(startNode) && cities.includes(endNode);
}

function dijkstra(graph: WeightedGraph, citiesToCheck: QueueToCheck): QueueToCheck{
    
    do{
        const cityToTraverse = getTheCheapestCityToCheck(citiesToCheck);
        for(const [cityToCheck, distance] of Object.entries(graph[cityToTraverse.city])){
            const cityToMeasure = citiesToCheck.find((city) => city.city === cityToCheck);
            if(!cityToMeasure) throw Error('there is no city in queue');
            const {distanceToCity} = cityToMeasure
            if(!cityToMeasure.checked && distance < distanceToCity){
                citiesToCheck.map((city) => {
                    if(city.city === cityToCheck){
                        city.distanceToCity = cityToTraverse.distanceToCity + distance;
                        city.previousCity = cityToTraverse.city
                    }
                    return city;
                })
            }
        }
        citiesToCheck.forEach(city => {
            if(city.city === cityToTraverse.city){
                city.checked = true;
            }
        })

    }while(citiesToCheck.some((city) => !city.checked));

    return citiesToCheck;
}

function queueToTraverse(graph: WeightedGraph, startNode: AVAILABLE_CITIES): QueueToCheck {
    const cities = Object.keys(graph);
    const queueToTraverse: QueueToCheck = [];
    cities.forEach(city => {
        const cost = city === startNode ? 0 : Infinity;
        queueToTraverse.push({
            city: city as AVAILABLE_CITIES,
            distanceToCity: cost,
            previousCity: "",
            checked: false
        });
    });
    return queueToTraverse;
}

function getTheCheapestCityToCheck(cityMap: QueueToCheck): City{
    return [...cityMap].filter((city) => !city.checked).sort((a, b) => 
        a.distanceToCity - b.distanceToCity
    )[0];
}

function checkConnections(graph: WeightedGraph, startNode: AVAILABLE_CITIES, endNode:AVAILABLE_CITIES){
    for(const city of Object.keys(graph)){
       if(city!==startNode){
        if(Object.keys(graph[city]).includes(endNode) && Object.keys(graph[startNode]).includes(city)) return true;
        if(Object.keys(graph[city]).includes(startNode) && city === endNode) return true;
       }
    }
    return false;
}

function getPath(cities: QueueToCheck, endNode: AVAILABLE_CITIES): AVAILABLE_CITIES[]{
    let nextCity = cities.find((city) => city.city === endNode);
    const path = [endNode];
    if(nextCity){
        do{
            if(nextCity){
                path.push(nextCity.previousCity);
                nextCity = cities.find((city) => city.city === nextCity?.previousCity);
            }

        }while(nextCity?.previousCity !== '');
    }
   

   return path.reverse();
}