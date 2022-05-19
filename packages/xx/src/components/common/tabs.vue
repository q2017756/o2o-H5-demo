<template lang="pug">
.tabs-wrap
    .tab-selecter-wrap
        .tab-selecter(v-for="item in tabs" :class='{current: modelValue === item.name}' @click="handleSelecter(item)") {{item.label}}
    .tab-content
        slot
</template>
<script setup>
import { provide, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    tabs: {
        type: Array,
        default: []
    }
})
const emit = defineEmits(['update:modelValue'])
const handleSelecter = item => {
    if (props.modelValue !== item.name) {
        emit('update:modelValue', item.name)
    }
}
const currentTab = computed(() => {
    return props.modelValue
})
provide('currentTab', currentTab)
defineExpose({
    current: props.modelValue
})
</script>

<style lang="scss">
.tabs-wrap {
    background-color: #fff;
    padding-left: 70px;
    .tab-selecter-wrap {
        position: fixed;
        left: 0;
        top: 0;
        width: 70px;
        min-height: 100vh;
        max-height: 100vh;
        overflow-y: auto;
        background-color: rgba($color: #000000, $alpha: 0.1);
        .tab-selecter {
            padding: 10px 0;
            text-align: center;
            &.current {
                background-color: #fff;
            }
        }
    }
    .tab-content {
        flex: 1;
    }
}
</style>