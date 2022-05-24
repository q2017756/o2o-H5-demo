<script setup>
import { useRoute } from 'vue-router';
// import { onMounted } from '@vue/runtime-core';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
const thisRoute = useRoute();
const shoppingStore = useStore()
const { getCarNum } = storeToRefs(shoppingStore);
</script>
<template>
    <div class="defaultPage">
        <router-view v-slot="{ Component, route }">
            <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component">{{route.meta.keepAlive}}</component>
            </keep-alive>
            <component :is="Component" v-else />
        </router-view>
        <div class="switch">
            <router-link to="/" custom v-slot="{ navigate, href, route }">
                <div :class="route.fullPath === thisRoute.path? 'chosenStype' : ''" @click="navigate">分类</div>
            </router-link>
            <router-link to="/shoppingCar"  custom v-slot="{ navigate, href, route }">
                <div class="carTypeBtn"  @click="navigate">
                    <span :class="route.fullPath === thisRoute.path ? 'chosenStype' : ''" >购物车</span>
                    <div class="absolute -top-2.5 -right-1.5 text-xs text-white bg-red-500 w-4 h-4 rounded-xl text-center" v-if="getCarNum">{{getCarNum}}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
.defaultPage {
    box-sizing: border-box;
    padding-bottom: 40px;
    height: 100%;
    /* position: relative; */
}
.switch {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 40px;
    justify-content: space-around;
    align-items: center;
    box-shadow: none;
    border-top: 1px solid #f0f0f0;
    background-color: white;
}
.chosenStype {
    color: green;
}
.carTypeBtn {
    position: relative;
}
</style>