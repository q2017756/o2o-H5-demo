<script setup>
import { ref } from "@vue/reactivity"
import { useStore } from "../../../store";
import { storeToRefs } from "pinia";
import { computed, watch } from "@vue/runtime-core";
import { onActivated, onMounted } from '@vue/runtime-core';
const props = defineProps({
    eachCount: {
        type: Object,
        default: () => {
           {}
        }
    }
})

let shoppingNum = ref('0');
const shoppingStore = useStore();
const { goodsListArr, getCarNum } = storeToRefs(shoppingStore);

const addShopping = () => {
    shoppingStore.addCar(props.eachCount);
}
watch(goodsListArr.value, () => {
    let goods = goodsListArr.value.find((item) => item.id === props.eachCount.id);
    if (goods) {
        shoppingNum.value = goods.count
    } else {
        shoppingNum.value = 0
    }
}, {immediate:false, deep: false})
onMounted(() => {
    let goods = goodsListArr.value.find((item) => item.id === props.eachCount.id);
    if (goods) {
        shoppingNum.value = goods.count
    } else {
        shoppingNum.value = 0
    }
})
</script>
<template>
    <div class="flex justify-start items-center">
       <div class="w-24 h-24"><img :src="eachCount.img" alt=""></div>
       <div class="flex-grow border-b py-2.5 pr-1">
           <div class="text-base">{{eachCount.name}}</div>
           <div class="text-xs text-gray-300 mb-4">{{eachCount.introduce}}</div>
           <div class="flex justify-between items-center">
               <div class="text-center text-xl text-red-500"><span class="text-xs">￥</span>{{eachCount.Price}}</div>
               <div class="w-6 h-6 text-center bg-green-500 text-white rounded-lg relative" @touchend.prevent.stop="addShopping">
                   +
                   <!-- flex items-center justify-center text-center -->
                   <div v-if="shoppingNum > 0" class="absolute -top-2.5 -right-0.5 text-xs text-white bg-red-500 w-4 h-4 rounded-xl items-center justify-center">{{shoppingNum}}</div>
                </div>
           </div>
       </div>
    </div>
</template>
<style scoped>
.goodsName {

}
.sdad {
    height: 8rem;
    padding: 0.75rem 0;
    text-align: center;
    align-items: center;
}
.icosss {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>