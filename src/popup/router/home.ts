import { RouteRecordRaw } from 'vue-router'
import HomePage from '@popup/pages/home/HomePage.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: HomePage,
        children: [
            {
                path: 'fest',
                component: () => import('@popup/pages/main/fest/FestPage.vue')
            },
            {
                path: 'regular',
                component: () => import('@popup/pages/main/RegularPage.vue')
            },
            {
                path: 'bankara',
                component: () => import('@popup/pages/main/BankaraPage.vue')
            },
            {
                path: 'x',
                component: () => import('@popup/pages/main/XPage.vue')
            },
            {
                path: 'event',
                component: () => import('@popup/pages/main/event/EventPage.vue')
            },
            {
                path: 'coop',
                component: () => import('@popup/pages/main/coop/CoopPage.vue')
            }
        ]
    }
]
