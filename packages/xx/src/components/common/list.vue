<template lang="pug">
.list-container(ref="listScroll")
    .list-wrap(
        @touchstart="handleTouchstart"
        @touchmove="handleTouchmove"
        @touchend="handleTouchend"
        @transitionend="handleTransitionend"
        :style='{transform: `translate3d(0, ${y}px, 0)`}'
        :class="[refreshFlag ? 'p-trans' : '']"
    )
        .pull-refresh-wrap(:style='{height: `${keyY}px`}')
            span.p-loading {{refreshTxt}}
        slot
        .bot-wrap(v-show="loading")
            span 加载中...
        .bot-wrap(v-show="finished")
            span ~~~没有了~~~
</template>

<script setup>
import { onMounted, ref, watch, nextTick, onBeforeUnmount } from 'vue';
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['pullRefresh', 'load', 'update:loading', 'update:finished'])
// 列表加载
onMounted(() => {
    // 首次加载至可滚动或结束或报错
    handleScroll()
})
// 加载下一页
// 滚动加载触发阈值，距离底部100px
const listScroll = ref(null)
const safeBot = 100
const handleScroll = () => {
    const scrollY = document.documentElement.scrollTop
    const pageH = window.innerHeight
    const scrollH = document.body.scrollHeight
    if (scrollY > scrollH - pageH - safeBot && !props.loading && !props.finished) {
        emit('update:loading', true)
        return emit('load')
    }
}
window.addEventListener('scroll', handleScroll)
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
// 下拉刷新的逻辑
const refreshTxt = ref('下拉刷新')
let baseY = 0
let y = ref(0)
let keyY = 60 // 最大下拉距离
const maxY = 100
let refreshFlag = ref(false)
const handleTouchstart = e => {
    if (e.touches.length === 1) {
        baseY = e.touches[0].pageY
    }
}
const handleTouchmove = e => {
    if (e.touches.length === 1) {
        let _y = e.touches[0].pageY - baseY
        if (_y < 0) return
        if (_y > keyY * 2 / 3) refreshTxt.value = '释放刷新'
        if (_y > maxY) _y = maxY
        y.value = _y
    }
}
const handleTouchend = e => {
    refreshFlag.value = true
    if (y.value > keyY * 2 / 3) { // 触发下拉刷新
        y.value = keyY
        refreshTxt.value = '加载中...'
        emit('pullRefresh')
        emit('update:loading', true)
        emit('update:finished', false)
    } else {
        baseY = 0
        y.value = 0
    }
}
watch(() => props.loading, async (current) => {
    if (refreshFlag.value && !current) {
        baseY = 0
        y.value = 0
    }
    if (!current) {
        await nextTick()
        handleScroll()
    }
})
const handleTransitionend = () => {
    if (!y.value) refreshFlag.value = false
}
</script>

<style lang="scss">
.list-container {
    overflow: hidden;
    .list-wrap {
        position: relative;
        height: 100%;
        .pull-refresh-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate3d(0, -100%, 0);
            position: absolute;
            left: 0;
            right: 0;
            .p-loading {

            }
        }
        .bot-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            color: #999;
        }
        &.p-trans {
            transition: transform .3s ease-in-out;
        }
    }
}
</style>