import { createRouter, createWebHistory } from 'vue-router'
import common from './common'
import goods from './goods'

const routes = [
    ...common,
    ...goods
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router