import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Cities',
        component: () => import(/* webpackChunkName: "cities" */ '../views/Cities.vue')
    },
    {
        path: '/city/:cityId',
        name: 'City',
        component: () => import(/* webpackChunkName: "city" */ '../views/City.vue')
    },
    {
        path: '/create',
        name: 'AffCity',
        component: () => import(/* webpackChunkName: "add-city" */ '../views/AddCity.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
