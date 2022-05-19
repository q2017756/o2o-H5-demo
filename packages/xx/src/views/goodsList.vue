<template lang="pug">
m-tabs(
    v-model="cTab"
    :tabs="tabs"
)
    m-tab(name='a1')
        p 1
        m-list(
            v-model:loading="loading"
            v-model:finished="finished"
            @pull-refresh='handlePullRefresh'
            @load="onload"
        )
            goods-item(v-for="item in list" :detail="item")
    m-tab(name='b2')
        p 2
        m-list(
            v-model:loading="list1.loading"
            v-model:finished="list1.finished"
            @pull-refresh='handlePullRefresh1(1)'
            @load="onload1(1)"
        )
            goods-item(v-for="item in list1.list" :detail="item")
</template>

<script setup>
import { ref, reactive } from 'vue';
import { mList, mTab, mTabs } from '../components/common'
import goodsItem from '../components/busi/goods-item.vue';

import goods from '../config/goods'
// tabs
const cTab = ref('a1')
const tabs = ref([
    {
        name: 'a1',
        label: '西瓜'
    },
    {
        name: 'b2',
        label: '红烧肉'
    },
])
// 列表加载
const loading = ref(false)
const finished = ref(false)
const list = ref([])
let a = 1
const handlePullRefresh = () => {
    a = 1
    setTimeout(() => {
        a++
        list.value = [...goods]
        loading.value = false
        if (a > 6) {
            return finished.value = true
        }
    }, 1000)
}
const onload = () => {
    setTimeout(() => {
        a++
        console.log('a:', a)
        loading.value = false
        list.value.push(...goods)
        if (a > 6) {
            return finished.value = true
        }
    }, 500)
}
const list1 = reactive({
    loading: ref(false),
    finished: ref(false),
    list: ref([])
})
const handlePullRefresh1 = (index) => {
    console.log(2, 'handlePullRefresh1')
    setTimeout(() => {
        list1.loading = false
        list1.list.push(...goods)
        return list1.finished = true
    }, 1500)
}
const onload1 = (index) => {
    console.log(2, 'onload1')
    setTimeout(() => {
        list1.loading = false
        list1.list.push(...goods)
        return list1.finished = true
    }, 1500)
}
</script>
