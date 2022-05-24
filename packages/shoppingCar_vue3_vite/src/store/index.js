import { defineStore } from 'pinia';
export const useStore = defineStore('shoppingCar', {
    state: () => {
        return {
            goodsListArr: [],
            carNum: 1
        }
    },
    getters: {
        getCarNum: (state) => {
            return state.goodsListArr.reduce(((num, item) => {
                return num + item.count
            }), 0)
        },
        getTotal: (state) => {
            return state.goodsListArr.reduce(((total, item) => {
                return total + item.count*item.Price
            }), 0)
        }
    },
    actions: {
        addCar(obj) {
            let goods = this.goodsListArr.find((item) => item.id === obj.id)
            if (goods) {
                goods.count++
                return;
            }
            this.goodsListArr.push({...obj, count: 1})
        },
        removeCar(obj) {
            let goods = this.goodsListArr.find((item) => item.id === obj.id);
            let removeIndex = this.goodsListArr.findIndex((item) => item.id === obj.id);
            if (goods.count>1) {
                goods.count--
                return;
            }
            this.goodsListArr.splice(removeIndex, 1)
        }
    }
})