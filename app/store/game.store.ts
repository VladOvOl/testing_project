import {useHistoryStore} from './history.store'

interface IGameStore {
    isRolling: boolean,
    balance: number,
    roll: number,
    result: ICombination,
    all_bets:number,
    all_user_wins:number,
    RTP: number,
}

const defaultValue: {store :IGameStore} = {
    store:{
        isRolling: false,
        balance: 100,
        roll:10,
        result:"none",
        all_bets:0,
        all_user_wins:0,
        RTP: 0
    }
}

export const useGameStore = defineStore('game',{
    state: () => defaultValue,
    getters:{
        isRolling: state => state.store.isRolling,
        balance: state => state.store.balance,
        roll: state => state.store.roll,
        result: state => state.store.result,
        all_bets: state => state.store.all_bets,
        all_user_wins: state => state.store.all_user_wins,
        RTP: state => state.store.RTP
    },
    actions:{
        set(input: IGameStore){
            this.$patch({store: input})
        },

        minusBalance(amount: number){
            if (amount <= this.balance) {
                this.store.balance -= amount
            }
        },

        setResult(result:ICombination){
            this.store.result = result
        },

        setIsRolling(arrayDice: number[], bet: number){
            const history = useHistoryStore()
            console.log(history.store)
            this.store.isRolling = true
            this.store.result = "none"
            this.store.all_bets += bet
            setTimeout(() =>{
                this.store.isRolling = false
                this.store.result = detectCombo(arrayDice) 
                if(this.store.result !== 'none'){
                    switch(this.store.result){
                        case 'pair':
                        this.store.balance += bet*2 
                        this.store.all_user_wins += bet*2 
                        this.store.RTP = (this.store.all_user_wins / this.store.all_bets) * 100
                        break;

                        case 'fullHouse':
                        this.store.balance += bet*3
                        this.store.all_user_wins += bet*3 
                        this.store.RTP = (this.store.all_user_wins / this.store.all_bets) * 100
                        break;

                        case 'balut':
                        this.store.balance += bet*4
                        this.store.all_user_wins += bet*4 
                        this.store.RTP = (this.store.all_user_wins / this.store.all_bets) * 100
                        break;

                        case 'straight':
                        this.store.balance += bet*5
                        this.store.all_user_wins += bet*5 
                        this.store.RTP = (this.store.all_user_wins / this.store.all_bets) * 100
                        break;
                    }

                    history.set(
                        {
                            count: history.store[history.store.length - 1]?.count ?? 0 ,
                            balance: this.store.balance
                        }
                    )
                }else{
                    history.set(
                        {
                            count: history.store[history.store.length - 1]?.count ?? 0,
                            balance: this.store.balance
                        })
                    }
            },1000)
        }

    },
    
})