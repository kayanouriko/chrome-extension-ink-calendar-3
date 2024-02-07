import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { sleep } from './tool'

import enUS from './data/locale/en-US.json'
import zhCN from './data/locale/zh-CN.json'

export default defineFakeRoute([
    {
        url: '/fake/locale/en-US.json',
        timeout: 1000,
        response: async () => {
            await sleep()
            return enUS
        }
    },
    {
        url: '/fake/locale/zh-CN.json',
        timeout: 1000,
        response: async () => {
            await sleep()
            return zhCN
        }
    }
])
