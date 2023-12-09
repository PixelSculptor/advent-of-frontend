// Tutaj skopiuj kod zadania

type PredicateResults = 1 | 0 | -1;

abstract class Strategy {
  abstract predicate(letterA: Letter, letterB: Letter): PredicateResults;
}

export class PriorityStrategy extends Strategy {
  override predicate({priority: priorityA}: Letter, {priority: priorityB}: Letter): PredicateResults {
    if((priorityA === 'high' && priorityB === 'medium') || (priorityA === 'medium' && priorityB === 'low') || (priorityA === 'high' && priorityB === 'low')){
      return -1;
    }else if((priorityA === 'medium' && priorityB === 'high') || (priorityA === 'low' && priorityB === 'high') || (priorityA === 'low' && priorityB === 'medium')){
      return 1;
    }
    return 0;
  }
}

export class LengthStrategy extends Strategy {
  override predicate({content: contentA}: Letter, {content: contentB}: Letter): PredicateResults {
    if(contentA.length < contentB.length) return -1;
    else if(contentA.length > contentB.length) return 1;
    return 0;
  }
}

export class CountryStrategy extends Strategy {
  override predicate({country: countryA}: Letter, {country: countryB}: Letter): PredicateResults {
    if((countryA === 'pl' && countryB ==='us') || (countryA === 'pl' && countryB === 'de') || (countryA === 'de' && countryB === 'us')) return -1;
    else if((countryA === countryB)) return 0;
    return 1;
  }
}

export type Letter = {
  content: string;
  country: 'pl' | 'de' | 'us';
  priority: 'high' | 'medium' | 'low';
}

interface ILetterSorter {
  strategy: PriorityStrategy | LengthStrategy | CountryStrategy
  sortLetters: (letters: Letter[]) => Letter[];
}
  export class LetterSorter implements ILetterSorter {
    strategy: PriorityStrategy | LengthStrategy | CountryStrategy;

    constructor(_strategy: Strategy){
      this.strategy = _strategy;
    }

    sortLetters(letters: Letter[]): Letter[] {
      return [...letters].sort(this.strategy.predicate);
    }
  }