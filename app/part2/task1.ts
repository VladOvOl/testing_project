type Combo = 'none' | 'pair' | 'fullHouse' | 'balut' | 'straight'

const odds: Record<Combo, number> = {
  pair: 2,
  fullHouse: 3,
  balut: 4,
  straight: 5,
  none: 0,
}

function detectCombo(dice: number[]): Combo {
  const counts = dice.reduce((acc, d) => {
    acc[d] = (acc[d] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const values = Object.values(counts)

  if (values.includes(5)) return 'balut'
  if (values.includes(4)) return 'fullHouse'
  if (values.includes(3)) return 'fullHouse'
  if (values.includes(2)) return 'pair'

  return 'none'
}

export function simulateRTP(iterations = 100000, bet = 10): number {
  let totalBets = 0
  let totalWins = 0

  for (let i = 0; i < iterations; i++) {
    const dice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)
    const combo = detectCombo(dice)
    totalBets += bet
    totalWins += bet * odds[combo]
  }

  return (totalWins / totalBets) * 100
}