// Tutaj skopiuj kod zadania
export type Gift = {
    value: number;
    weight: number;
    volume: number;
  };
  
export function calculateMaxGiftValue(gifts: Gift[], maxWeight: number, maxVolume: number): number {
    const giftsToCheck = [...gifts];
    let total = 0;
    let restOfWeight = 0;
    let restOfVolume = 0;
    
    if(giftsToCheck.length === 0) return 0;

    while(giftsToCheck.length !== 0){
        const max = findActualTheMostValuableGift(giftsToCheck);
        if(max.volume < maxVolume && max.weight < maxWeight){
            if((restOfWeight + max.weight) <= maxWeight && (restOfVolume + max.volume) <= maxVolume){
                total += max.value;
                restOfWeight += max.weight;
                restOfVolume += max.volume;
            }
        }
        removeFromGiftListToCheck(giftsToCheck, max);
    }
    return total;
}

function findActualTheMostValuableGift(gifts: Gift[]): Gift{
    return gifts.reduce((currentMax:Gift, currentToCheck: Gift) => {
        if(currentMax.value < currentToCheck.value){
            currentMax = currentToCheck;
        }

        return currentMax;
    }, {
        value: 0,
        volume: 0,
        weight: 0
    })
}

function removeFromGiftListToCheck(gifts: Gift[], giftToDelete: Gift){
    const indexDeleteItem = gifts.findIndex((g) => {
        return (g.value === giftToDelete.value && g.volume === giftToDelete.volume && g.weight === giftToDelete.weight);
    });

    gifts.splice(indexDeleteItem, 1);
}