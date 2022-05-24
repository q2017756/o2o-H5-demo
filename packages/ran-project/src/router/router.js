import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/shopping',
            name: 'shopping',
            component: () => import('../pages/main.vue')
        },
        {
            path: '/shopDetail',
            name: 'shopDetail',
            component: () => import('../pages/shopDetail.vue')
        }
    ]
})

export default router