<script setup lang="ts">
import { useGameStore } from '~/store/game.store';

const store = useGameStore()
const roll = ref(10)
const arrayDice = ref([0,0,0,0,0])

function onRoll() {
    arrayDice.value = rollDice()
    store.minusBalance(roll.value)
    store.setIsRolling(arrayDice.value, roll.value)
    
    
    //store.setResult(detectCombo(arrayDice.value))
    //console.log(detectCombo(arrayDice.value))
}

function onChangeRoll() {
    if (roll.value > store.balance) {
        roll.value = store.balance
    }
    if (roll.value < 0) {
        roll.value = 0
    }
}

const isDisabled = computed(() => {
  return roll.value > store.balance || store.isRolling
})


</script>

<template>
    <div class="sidebar_main_container">
        <div class="container_dice"> 
            <h1>Dice</h1>
            <div class="dice_array">
                <ClientOnly>
                    <UIDice 
                        v-for="dice in arrayDice"
                        :count="dice"
                        :isRolling="store.isRolling"
                    />
                </ClientOnly>
            </div>
        </div>
        <div class="container_prices">
            <h1>Prices</h1>
            <div 
                class="container_combination"
                :style = "{
                    color: store.result === 'pair' ? 'red' : 'black'
                }"
            >
                <p>Pair</p>
                <h3>x2</h3>
            </div>
            <div 
                class="container_combination"
                :style = "{
                    color: store.result === 'fullHouse' ? 'red' : 'black'
                }"
            >
                <p>Full house</p>
                <h3>x3</h3>
            </div>
            <div 
                class="container_combination"
                :style = "{
                    color: store.result === 'balut' ? 'red' : 'black'
                }"
            >
                <p>Balut</p>
                <h3>x4</h3>
            </div>
            <div 
                class="container_combination"
                :style = "{
                    color: store.result === 'straight' ? 'red' : 'black'
                }"
            >
                <p>Straight</p>
                <h3>x5</h3>
            </div>
            <div 
                class="container_combination"
                :style = "{
                    color: store.result === 'other' ? 'red' : 'black'
                }"
            >
                <p>Other</p>
                <h3>x0</h3>
            </div>
        </div>
        <div class="container_bet_balance">
            <div class="container_bet">
                <h1>Bet</h1>
                <div class="container_bet_controls">
                    <input 
                        type="number"
                        v-model.number="roll"
                        @input="onChangeRoll"
                    />
                    <button 
                        @click="onRoll"
                        :disabled="isDisabled"
                    >
                        ROLL
                    </button>
                </div>
            </div>
            <div class="container_balance">
                <h1>Your balanced</h1>
                <h4>{{ store.balance }}</h4>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
    .sidebar_main_container{
        width: 70%;
        height: 50%;
        background-color: white;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 5%;
        grid-row-gap: 5%;
        padding: 5%;
        box-shadow: 0 4px 12px rgba(43, 42, 42, 0.15);

    }

    .container_dice { 
        padding: 10px;
        grid-area: 1 / 1 / 2 / 3;
        box-shadow: 0 4px 12px rgba(43, 42, 42, 0.15);
    }

    .dice_array{
        display: flex;
        justify-content: space-between;
    }

    .container_prices { 
        padding: 10px;
        grid-area: 2 / 1 / 4 / 2;
        box-shadow: 0 4px 12px rgba(43, 42, 42, 0.15);  
    }

    .container_combination{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
   
    .container_bet_balance{
        grid-area: 2 / 2 / 4 / 3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .container_bet { 
        padding: 10px; 
        height: 45%;
        box-shadow: 0 4px 12px rgba(43, 42, 42, 0.15);
    }

    .container_bet_controls{
        display: flex;

    }

    .container_balance {
        height: 35%;
        padding: 10px;
        box-shadow: 0 4px 12px rgba(43, 42, 42, 0.15);
    }

    h1{
        font-size: 25px;
        font-weight: 700;
        text-align: center;
    }

    h3{
        font-size: 20px;
        font-weight: 700;
    }

    h4{
        font-size: 20px;
        text-align: center;
        margin-top: 10px;
    }
</style>