<script setup>
import { ref } from "@vue/reactivity"
import { onActivated, onMounted } from '@vue/runtime-core';
const props = defineProps({
    itemList: {
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
const emit = defineEmits(['leftEachClick'])
const chosenType = ref('')
const chooseType = (id) => {
    // text-black
    chosenType.value = id
    emit('leftEachClick', id)
}
defineExpose({
    chooseType
})
onMounted(() => {
})
</script>
<template>
    <div class="h-full bg-gray-300">
        <div v-for="(item, index) in itemList" :key="index" @click="chooseType(item.id)" class="w-full text-center h-10 leading-10" :class="configGoodsType === item.id ? 'text-green-600 bg-white' : 'text-white'" >{{item.value}}</div>
    </div>
</template>
<style scoped></style>