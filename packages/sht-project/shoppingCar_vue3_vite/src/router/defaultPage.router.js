// import home from '@/pages/home/home.vue';
export default [{
    path: '/',
    name: 'default',
    component: () => import('@/pages/defaultPage/defaultPage.vue'),
    meta: {
        // keepAlive: true
    },
    children: [
        {
            path: '/',
            component: () => import('@/pages/home/home.vue'),
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/shoppingCar',
            component: () => import('@/pages/shoppingCar/shoppingCar.vue'),
            meta: {
                keepAlive: true
            }
        }
    ]
}]