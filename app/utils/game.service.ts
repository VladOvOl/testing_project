
export function rollDice(): number[] {
  const count = 5
  const sides = 6

  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * sides) + 1
  )
}


export type ICombination = 
  | 'pair'      
  | 'fullHouse'  
  | 'straight'   
  | 'balut'      
  | 'none';      

export function detectCombo(dice: number[]): ICombination {
    if (dice.length !== 5) {
        throw new Error('Ожидается массив из 5 чисел');
    }

    const counts = new Map<number, number>();
        for (const die of dice) {
            counts.set(die, (counts.get(die) || 0) + 1);
    }
  const freq = Array.from(counts.values()).sort((a, b) => b - a);

    if (freq[0] === 5) {
        return 'balut';
    }

    if (freq[0] === 3 && freq[1] === 2) {
        return 'fullHouse';
    }

    const sorted: number[] = [...new Set(dice)].sort((a, b) => a - b)
    const isSeq =
        sorted.length === 5 &&
        //@ts-ignore
        sorted[4] - sorted[0] === 4 &&
        //@ts-ignore
        sorted.every((v: number, i: number, arr: number[]) => i === 0 || (v - arr[i - 1]) === 1)

    if (isSeq) {
        return 'straight';
    }

    if (freq[0] === 2) {
        return 'pair';
    }

     return 'none';
}

