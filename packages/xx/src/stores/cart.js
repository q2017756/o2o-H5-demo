import { defineStore } from 'pinia'

export default defineStore('cart', {
    state: () => {
        return {
            goodsNum: 0,
            goodsList: []
        }
    }
})