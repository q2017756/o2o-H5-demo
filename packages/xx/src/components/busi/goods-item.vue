<template lang="pug">
div.flex.px-1
    div.py-1.flex-none
        div.w-6.h-6.mr-1.bg-center.bg-no-repeat.bg-contain(:style='{backgroundImage: `url(${detail.image})`}')
    div.py-1.flex-auto.flex.flex-col.justify-between.border-b.border-gray
        div
            p {{detail.productName}}
            div.flex
                p(v-for="tag in detail.tags") {{tag}}
        div
            p
                span &yen;
                span {{detail.price}}
            div
    div.flex-none.flex.items-end.py-1.border-b.border-gray
        div.w-2.h-2.bg-center.bg-no-repeat.bg-contain.add-btn.relative
            div.w-auto.h-auto.tip.absolute.rounded-full.flex.items-center.justify-center(:class="['-top-0.5', '-right-0.5']")
                span 12
</template>

<script setup>
const props = defineProps({
    detail: Object
})
</script>

<style lang="scss">
.add-btn {
    background-image: url('../../assets/add.png');
    .tip {
        background-color: #f33;
        color: #fff;
        font-size: 9px;
        line-height: 1;
        padding: 3px;
    }
}
</style>
