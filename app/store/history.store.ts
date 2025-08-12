interface IHistoryStore {
    count: number,
    balance: number,
}

const defaultValue: {store: IHistoryStore[]} = {
    store: [{
        balance: 100,
        count:0,
    }]
}

export const useHistoryStore = defineStore('history',{
    state: () => defaultValue,
    getters:{
        getStore: state => state.store,
    },
    actions:{
        set(input: IHistoryStore){
            console.log(input)
            this.$patch({
            store: [...this.store, input]
})

        }
    }

})