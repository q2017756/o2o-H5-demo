import { defineAsyncComponent } from 'vue'
// const _import = path => defineAsyncComponent(() => import(`../views/${path}.vue`))
const _import = path => () => import(`../views/${path}.vue`)

const home = {
    path: '/goods',
    name: 'goodsList',
    component: _import('goodsList')
}

export default [
    home
]