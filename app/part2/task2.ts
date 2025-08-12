type Combo = 'none' | 'pair' | 'fullHouse' | 'balut' | 'straight'

const baseOdds: Record<Combo, number> = {
    pair: 2,
    fullHouse: 3,
    balut: 4,
    straight: 5,
    none: 0,
}

function factorial(n: number): number {
    if (n <= 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
        result *= i
    }
    return result
}

function comb(n: number, k: number): number {
    return factorial(n) / (factorial(k) * factorial(n - k))
}

export function calculateAdjustedOdds(targetRTP = 0.95): Record<Combo, number> {
    const totalOutcomes = Math.pow(6, 5) // 7776

    const balutChance = 6 / totalOutcomes

    const straightChance = 2 / totalOutcomes

    const fullHouseChance = comb(5, 3) * 6 * 5 / totalOutcomes

    const allDifferent = (6 * 5 * 4 * 3 * 2) / totalOutcomes
    const threeOfKind = (6 * comb(5, 3) * Math.pow(5, 2)) / totalOutcomes
    const pairChance = 1 - balutChance - straightChance - fullHouseChance - allDifferent - threeOfKind

    const expectedReturn =
        balutChance * baseOdds.balut +
        straightChance * baseOdds.straight +
        fullHouseChance * baseOdds.fullHouse +
        pairChance * baseOdds.pair

    const coeff = targetRTP / expectedReturn

    const adjustedOdds: Record<Combo, number> = {
        balut: baseOdds.balut * coeff,
        straight: baseOdds.straight * coeff,
        fullHouse: baseOdds.fullHouse * coeff,
        pair: baseOdds.pair * coeff,
        none: 0,
    }

    console.log(' RTP = 95%:')
    console.log(`Balut: ${adjustedOdds.balut.toFixed(3)}`)
    console.log(`Straight: ${adjustedOdds.straight.toFixed(3)}`)
    console.log(`Full House: ${adjustedOdds.fullHouse.toFixed(3)}`)
    console.log(`Pair: ${adjustedOdds.pair.toFixed(3)}`)
    console.log(`None: ${adjustedOdds.none.toFixed(3)}`)

  return adjustedOdds
}
