import { createRouter, createWebHashHistory } from 'vue-router'

import BaseLoadView from '../pages/base/BaseLoadView.vue'
import RegularView from '../pages/regular/RegularView.vue'
import BankaraView from '../pages/bankara/BankaraView.vue'
import XView from '../pages/x/XView.vue'
import CoopView from '../pages/coop/CoopView.vue'
import FestView from '../pages/fest/FestView.vue'
import GearBaseView from '../pages/gear/GearBaseView.vue'

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        component: BaseLoadView,
        children: [
            {
                path: 'regular',
                component: RegularView
            },
            {
                path: 'bankara',
                component: BankaraView
            },
            {
                path: 'x',
                component: XView
            },
            {
                path: 'coop',
                component: CoopView
            },
            {
                path: 'fest',
                component: FestView
            }
        ]
    },
    {
        path: '/gear',
        component: GearBaseView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export function useRouter() {
    return router
}
