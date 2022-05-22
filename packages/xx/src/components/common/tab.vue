<template lang="pug">
.tab-wrap(v-show="selected === name")
    slot(v-if="rendered")
</template>

<script setup>
import { watch, inject, ref, onMounted} from 'vue'
const props = defineProps({
    name: {
        type: String,
        default: ''
    }
})
const rendered = ref(false)
const selected = inject('currentTab')
watch(() => selected.value, (cur) => {
    if (cur === props.name) {
        rendered.value = true
    }
})
onMounted(() => {
    if (selected.value === props.name) {
        rendered.value = true
    }
})
</script>

<style lang="scss">
.tab-wrap {

} 
</style>