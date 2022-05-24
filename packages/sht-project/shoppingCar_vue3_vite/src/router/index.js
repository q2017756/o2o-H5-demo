import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// import home from './home.router';
import defaultPage from './defaultPage.router';
const routes = [
    // ...home,
    ...defaultPage
]
const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes
})
export default router;