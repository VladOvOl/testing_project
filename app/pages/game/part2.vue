<script setup lang="ts">
    import { simulateRTP } from '~/part2/task1';
    import { calculateAdjustedOdds } from '~/part2/task2';


    const rtp = simulateRTP(100000, 10)
    console.log(`RTP after 100000 game: ${rtp.toFixed(2)}%`)
    const task2 = calculateAdjustedOdds()
</script>

<template>
    <div>
        <p>Task1 - {{ `RTP after 100000 game: ${rtp.toFixed(2)}%` }}</p>
        
        <p>
            Task2 - {{ 
                `RTP = 95%:
                Balut: ${task2.balut.toFixed(3)}
                Straight: ${task2.straight.toFixed(3)}
                Full House: ${task2.fullHouse.toFixed(3)}
                Pair: ${task2.pair.toFixed(3)}
                None: ${task2.none.toFixed(3)}`
            }}
        </p>
    </div>
</template>