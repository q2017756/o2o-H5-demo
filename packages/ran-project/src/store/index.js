import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            counter: 1,
            name: 'wangRan',
            carLists: []
        }
    },
    getters: {
        number(state) {
            return this.counter * 2
        },
    },
    actions: {
        changeValue() {
            this.counter = 3
        },
        addShopCarList(val) {
            this.carLists.push(val)
        },
        delete(title) {
            this.carLists = this.carLists.filter(item => item.title !== title)
        },
        addNumber(title) {
            let itemObj = this.carLists.find(item => item.title === title)
            itemObj.addNum++
        },
        deleteNumber(title) {
            let itemObj = this.carLists.find(item => item.title === title)
            itemObj.addNum--
        }
    }
})