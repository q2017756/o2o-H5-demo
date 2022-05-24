// import home from '@/pages/home/home.vue';
export default [{
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/home.vue'),
    meta: {
        keepAlive: true
    }
}]