import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { sleep } from './tool'
import festivals from './data/festivals.json'

export default defineFakeRoute([
    {
        url: '/fake/festivals.json',
        timeout: 1000,
        response: async () => {
            await sleep()
            return festivals
        }
    }
])
