<script setup>
import { useStore } from "@/store";
import { ref } from "@vue/reactivity"
const props = defineProps({
    eachCarMsg: {
        type: Object,
        default: () => {
            {}
        }
    },
    toBeSteeledArr: {
        type: Array,
        default: () => {
            []
        }
    },
    configGoodsType: {
        type: String,
        default: ''
    }
})
let beSelectGoods = ref('');
const shoppingStore = useStore();
const emit = defineEmits(['addRoSettle']);
const removeGoods = () => {
    shoppingStore.removeCar(props.eachCarMsg);
}
const addGoods = () => {
    shoppingStore.addCar(props.eachCarMsg);
}
const selectGoods = () => {
    // emit('addRoSettle', props.eachCarMsg);
    if (beSelectGoods.value === props.eachCarMsg.id) {
        beSelectGoods.value = ''
        emit('addRoSettle', props.eachCarMsg);
        return;
    }
    emit('addRoSettle', props.eachCarMsg);
    beSelectGoods.value = props.eachCarMsg.id;
}
</script>
<template>
    <div class="eachCar" @click.stop="selectGoods">
        <div class="eachCar_select">
           <div class="w-4 h-4 border rounded-full" :class="props.toBeSteeledArr.findIndex((item) => item.id === eachCarMsg.id) >= 0? 'bg-green-500 border-green-500' : '' "></div>
        </div>
        <!-- <div class="eachCar_img"></div> -->
        <img class="eachCar_img" :src="eachCarMsg.img" alt="" srcset="">
        <div class="eachCar_goodsinfo flex-grow">
            <div class="eachCar_goodsinfo_title text-base">{{eachCarMsg.name}}</div>
            <div class="eachCar_goodsinfo_specifications text-xs text-gray-300 mb-4"></div>
            <div class="flex justify-between items-center">
                <div class="eachCar_goodsinfo_price text-center text-xl"><span class="text-xs text-red-500">￥</span><span class="text-red-500">{{eachCarMsg.Price}}</span><span class="text-gray-300 text-xs">/瓶</span></div>
                <div class="flex justify-start items-center h-6 ext-center border border-gray-300  rounded-xl">
                    <div class="h-full w-6 text-center leading-5" @click.stop="removeGoods">-</div>
                    <div class="h-full w-7 text-center border-r border-l leading-5 border-gray-300">{{eachCarMsg.count}}</div>
                    <div class="h-full w-6 text-center leading-5" @click.stop="addGoods">+</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.eachCar {
    width: 100%;
    min-height: 70px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
}
.eachCar_select {
    height: 100%;
}
.eachCar_img {
    width: 70px;
    height: 70px;
    margin: 0 8px;
}
</style>