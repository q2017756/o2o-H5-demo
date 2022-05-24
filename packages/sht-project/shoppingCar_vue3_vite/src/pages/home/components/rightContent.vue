<script setup>
import RightEach from './rightEach.vue';
import { ref } from "@vue/reactivity"
const props = defineProps({
    rightList: {
        type: Array,
        default: () => {
           []
        }
    }
})
let loadingTest = ref('下拉');
const emit = defineEmits(['moveFunc']);
const startPosition = ref('0');
const movePosition = ref(0);
const endPosition = ref(0);
const sollDiv = ref(null);
const rightEach = ref(null);
const getScrollTop = (el) => {
    let top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
    return Math.max(top, 0);
}
const isPullUp = (el) => {
 return el.scrollHeight <= el.clientHeight || el.scrollHeight > el.clientHeight && el.scrollHeight-getScrollTop(el)-el.clientHeight <= 0
}
const handTouchstart = (e) => {
    // console.log(movePosition.value)
    startPosition.value = e.touches[0].clientY;
    e.preventDefault();
    console.log(e)
}
const handTouchMove = (e) => {
    rightEach.value.style.transition = 'transform 0s linear';
    // console.log(movePosition.value)
    if (movePosition.value >= 100 ) {
        console.log('下拉啦')
        loadingTest.value = '松开上一类'
        return;
    }
    loadingTest.value = ''
    console.log(rightEach.value.scrollHeight)
    console.log(sollDiv.value.clientHeight)
    let differenceMove = rightEach.value.scrollHeight - sollDiv.value.clientHeight;
    // if ((differenceMove>0 && Math.abs(movePosition.value)>differenceMove+100) || ifferenceMove<0 && Math.abs(movePosition.value)>100) {
        
    // }
    if ((differenceMove>0 && Math.abs(movePosition.value)>differenceMove+100) || differenceMove<0 && Math.abs(movePosition.value)>100) {
        console.log('上拉啦')
        return;
    }
    console.log('move')
    let touch = e.touches[0].clientY - startPosition.value;
    console.log(touch);
    console.log('endPosition.value+', endPosition.value);
    movePosition.value =  endPosition.value + touch;
    rightEach.value.style.transform = `translateY(${movePosition.value}px)`
    // console.log(movePosition.value)
}
const handTouchEnd = (e) => {
    rightEach.value.style.transition = 'transform 0.5s ease-in-out';
    // if (isPullUp(sollDiv.value)) { // 上拉加载
    //     // console.log('上拉')
    //     if (Math.abs(movePosition.value) >= 100) {
    //         emit('moveFunc', 'up');
    //     }
    //     // sollDiv.value.style.transform = `translateY(0px)`;
    // //    return;
    // }
    let differenceMove = rightEach.value.scrollHeight - sollDiv.value.clientHeight;
    // console.log(rightEach.value.scrollHeight)
    // console.log(sollDiv.value.clientHeight)
    // console.log(differenceMove);
    if (movePosition.value < 0) {
        if ((differenceMove>0 && Math.abs(movePosition.value)>differenceMove+100) || differenceMove<0 && Math.abs(movePosition.value)>100) {
            console.log('触发上拉加载')
            //  emit('moveFunc', 'up');
             setTimeout(() => {
                 emit('moveFunc', 'up');
             }, 500);
        }
        // movePosition.value = -differenceMove;
        movePosition.value = differenceMove>0 ? -differenceMove : endPosition.value;
        rightEach.value.style.transform = `translateY(${movePosition.value}px)`;
        endPosition.value = movePosition.value;
        return;
    }
    console.log(movePosition.value);
    if (movePosition.value > 0) {
        console.log(movePosition.value);
        if (movePosition.value >= 100) {
            console.log('触发下拉刷新')
            // emit('moveFunc', 'down');
            setTimeout(() => {
                emit('moveFunc', 'down');
            }, 500);
        }
        movePosition.value = 0;
        rightEach.value.style.transform = `translateY(${movePosition.value}px)`;
        endPosition.value = movePosition.value;
        return;
    }
    endPosition.value = movePosition.value;
}
const aaaas = () => {
    console.log('2323')
}
</script>
<template>
    <div ref="sollDiv" @touchstart='handTouchstart' @touchmove='handTouchMove' @touchend='handTouchEnd' class='rightCoutent'>
        <div class='upLoading'>{{loadingTest}}</div>
        <div ref="rightEach" class="rightEach">
            <RightEach v-for="(item, index) in rightList" :key="index" :eachCount="item"></RightEach>
        </div>
    </div>
</template>
<style scoped>
.rightCoutent {
    position: relative;
    /* top: -100px; */
    overflow: hidden;
    /* overflow-y: auto; */
    height: 100%;
}
.upLoading {
    text-align: center;
    height: 100px;
    /* background-color: palegoldenrod; */
    color: grey;
    line-height: 100px;
    /* position: absolute; */
    /* top: -100px; */
}
.rightEach {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
}
</style>