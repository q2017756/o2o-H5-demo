<script setup>
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ref, reactive} from 'vue';
import { computed, watch } from "@vue/runtime-core";
import EachCar from "./components/eachCra.vue";
const shoppingStore = useStore()
const { goodsListArr, getTotal } = storeToRefs(shoppingStore);
let beSelectAll = ref(false)
let toBeSteeledArr = ref([])
const selectAll = () => {
    // beSelectAll.value = !beSelectAll.value
    // // beSelectAll.value && toBeSteeledArr.value = goodsListArr.value
    // if (beSelectAll.value) {
    //     toBeSteeledArr.value = JSON.parse(JSON.stringify(goodsListArr.value));
    // }
    toBeSteeledArr.value = toBeSteeledArr.value.length===goodsListArr.value.length? [] : JSON.parse(JSON.stringify(goodsListArr.value))
}
const addRoSettle = (obj) => {
    let removeIndex = toBeSteeledArr.value.findIndex((item) => item.id === obj.id);
    console.log(removeIndex)
    if (removeIndex >= 0) {
        toBeSteeledArr.value.splice(removeIndex, 1)
    } else {
        toBeSteeledArr.value.push(obj);
    }
}
let settlementNum = computed(() => {
    return toBeSteeledArr.value.reduce(((num, item) => {
        return num + item.count
    }), 0)
})
let settlementAmount = computed(() => {
    return toBeSteeledArr.value.reduce(((total, item) => {
        return total + item.count*item.Price
    }), 0)
})
watch(goodsListArr.value, () => {
    if (toBeSteeledArr.value.length >= goodsListArr.value.length) {
        toBeSteeledArr.value = JSON.parse(JSON.stringify(goodsListArr.value));
    }
}, {immediate:false, deep: false})
</script>
<template>
    <div class="shoppingCar">
        <div v-if="goodsListArr.length > 0">
            <div class="car_goods">
                <EachCar v-for="(item, index) in goodsListArr" :key="index" :eachCarMsg="item" @addRoSettle="addRoSettle" :toBeSteeledArr="toBeSteeledArr"></EachCar>
            </div>
            <div class="car_buttom_box flex rounded-t-2xl bg-white fixed left-0 right-0 justify-between items-center p-2">
                <div class="left_select flex items-center" @click="selectAll">
                    <div class="mr-2">
                        <div class="w-4 h-4 border rounded-full" :class="toBeSteeledArr.length === goodsListArr.length? 'bg-green-500 border-green-500' : '' "></div>
                    </div>
                    <span>全选</span>
                </div>
                <div class="right_box flex items-center">
                    <div class="leading-10 mr-2 text-sm">共计: <span class="text-xs text-red-500">￥</span><span class="text-red-500 text-2xl">{{settlementAmount}}</span> </div>
                    <div class="w-16 min-w-min h-10 text-gray-50 bg-red-500 text-center leading-10 rounded-full">结算{{settlementNum}}</div>
                </div>
            </div>
        </div>
        <div v-else class="text-center emptyCar">
            <!-- <img src="./img/emiptCar.png" alt=""> -->
            <div>还没有加购商品哦!</div>
        </div>
    </div>
</template>
<style scoped>
.shoppingCar {
    background-color: rgb(246, 246, 249);
    padding: 10px 10px 60px;
    height: 100%;
    overflow-y: auto;
}
.car_buttom_box {
    bottom: 40px;
}
.emptyCar img {
    margin: 0 auto;
}
</style>