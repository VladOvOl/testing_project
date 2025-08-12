<script setup lang="ts">
import {defineProps } from 'vue'

const props = defineProps<{
  count: number,
  isRolling: boolean
}>()


const pipPositions: Record<number, Array<[number, number]>> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
}

</script>

<template>
    <div class="dice" :class="{ rolling: props.isRolling }">
        <template v-if="props.count > 0">
        <div
            v-for="(pos, idx) in pipPositions[props.count] || []"
            :key="idx"
            class="pip"
            :style="{
            '--row': pos[0],
            '--col': pos[1],
            }"
        />
        </template>
        
        <template v-else>
        <p class="question">?</p>
        </template>   
    </div>
</template>

<style scoped>
.dice {
    --size: 50px;
    --bg: #fafafa;
    --border-color: #ddd;
    --shadow-light: rgba(255, 255, 255, 0.7);
    --shadow-dark: rgba(0, 0, 0, 0.15);
    --pip-size: calc(var(--size) / 5);
    --pip-color: #333;
    --duration: 1s;

    position: relative;
    width: var(--size);
    height: var(--size);
    background: var(--bg);
    border-radius: 12%;
    border: 2px solid var(--border-color);
    box-shadow:
        inset 0.1em 0.1em 0.2em var(--shadow-dark),
        0.15em 0.15em 0.3em var(--shadow-dark);

    /* Включаем 3D-контекст для поворота */
    transform-style: preserve-3d;
    perspective: 500px;
    transform-origin: center;
    transition: transform var(--duration) ease-out;
}

@keyframes roll {
    0%   { transform: rotateX(0deg)   rotateY(0deg); }
    25%  { transform: rotateX(-180deg) rotateY(0deg); }
    50%  { transform: rotateX(-180deg) rotateY(-180deg); }
    75%  { transform: rotateX(0deg)   rotateY(-180deg); }
    100% { transform: rotateX(0deg)   rotateY(0deg); }
}


.dice.rolling {
    animation: roll var(--duration) ease-out;
}

.dice::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: inherit;
    background: linear-gradient(
        135deg,
        var(--shadow-light) 0%,
        transparent 60%
    );
    pointer-events: none;
}

.pip {
    position: absolute;
    width: var(--pip-size);
    height: var(--pip-size);
    background: var(--pip-color);
    border-radius: 50%;


    top: calc((var(--row) + 0.5) * 100% / 3);
    left: calc((var(--col) + 0.5) * 100% / 3);
    transform: translate(-50%, -50%);
}

.question {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #000000;
}

</style>
