import { createRouter, createWebHashHistory } from 'vue-router'
import { routes as homeRoutes } from './home'
import { routes as menuRoutes } from './menu'

export function createAppRouter() {
    return createRouter({
        history: createWebHashHistory(),
        routes: [...homeRoutes, ...menuRoutes]
    })
}
