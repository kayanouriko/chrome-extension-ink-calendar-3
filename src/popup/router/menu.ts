import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
    {
        path: '/menu',
        component: () => import('@popup/pages/menu/MenuPage.vue'),
        children: [
            {
                name: 'home',
                path: 'home',
                component: () => import('@popup/pages/menu/HomePage.vue')
            },
            {
                name: 'gear',
                path: 'gear',
                component: () => import('@popup/pages/menu/gear/GearPage.vue')
            },
            {
                name: 'fest',
                path: 'fest',
                component: () => import('@popup/pages/menu/fest/FestPage.vue')
            }
        ]
    }
]
