import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { sleep } from './tool'
import gear from './data/gear.json'

export default defineFakeRoute([
    {
        url: '/fake/gear.json',
        timeout: 1000,
        response: async () => {
            await sleep()
            return gear
        }
    }
])
