<script setup>
import { reactive, ref } from '@vue/reactivity';
import LeftEach from './components/leftEach.vue';
import RightCoutent from './components/rightContent.vue';
import { onActivated, onMounted } from '@vue/runtime-core';
let goodsType = reactive([
    {
        id: '1',
        value: '肉'
    },
    {
        id: '2',
        value: '蛋'
    },
    {
        id: '3',
        value: '奶'
    }
])
let goodsInfoList = ref([]);
let goodsInfoListMock = reactive([
    {
        id: '11',
        name: '肉黄瓜',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根肉黄瓜',
        type: '1',
        Price: '9'
    },
    {
        id: '12',
        name: '肉黄瓜2',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根肉黄瓜2',
        type: '1',
        Price: '9'
    },
    {
        id: '13',
        name: '肉黄瓜3',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根肉黄瓜3',
        type: '1',
        Price: '9'
    },
    {
        id: '21',
        name: '蛋黄瓜4',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根蛋黄瓜4',
        type: '2',
        Price: '9'
    },
    {
        id: '22',
        name: '蛋黄瓜5',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根蛋黄瓜5',
        type: '2',
        Price: '9'
    },
    {
        id: '23',
        name: '蛋黄瓜6',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根蛋黄瓜6',
        type: '2',
        Price: '9'
    },{
        id: '31',
        name: '奶黄瓜7',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根奶黄7',
        type: '3',
        Price: '9'
    },
    {
        id: '32',
        name: '黄瓜8',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根黄奶瓜8',
        type: '3',
        Price: '9'
    },
    {
        id: '33',
        name: '黄瓜9',
        img: 'https://img1.baidu.com/it/u=987469933,886839829&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
        introduce: '这是一根奶黄瓜9',
        type: '3',
        Price: '9'
    }
])
let chosenGoodsType = ref('')
let showGoodsList = ref(false);
const leftEach = ref(null)
const clickGoods = (id) => {
    // goodsInfoList = []
    if (id === chosenGoodsType.value) {
        return;
    }
    showGoodsList.value = false;
    // showGoodsList.value = true;
    chosenGoodsType.value = id;
    setTimeout(() => {
        let showList = [];
        goodsInfoListMock.map((item) => {
            if (item.type === id) {
                showList.push(item);
            }
            return showList
        })
        showGoodsList.value = true;
        goodsInfoList.value = showList;
    }, 500);
    console.log(`请求id为${id}的数据`);
}
const bechoseType = (type) => {
    let index = goodsType.findIndex((item) => item.id === chosenGoodsType.value);
    let id = type === 'up' ? index>=goodsType.length - 1 ? index : index + 1 : index  === 0 ? index : index - 1
    leftEach.value.chooseType(goodsType[id].id);
}
const queryGoodsList = () => {}
onMounted(() => {
    clickGoods('1')
})
</script>
<template>
    <div class="flex justify-start h-full items-start">
        <LeftEach ref="leftEach" :itemList="goodsType" @leftEachClick="clickGoods" :configGoodsType="chosenGoodsType" class="w-20 mr-4"></LeftEach>
        <!-- <div v-if="showGoodsList"> -->
            <RightCoutent v-if="showGoodsList" @moveFunc="bechoseType" :rightList="goodsInfoList" class="flex-grow"></RightCoutent>
        <!-- </div> -->
        <!-- <div class="flex-grow">right</div> -->
    </div>
    
    <!-- <div>购物车底部展示</div> -->
</template>