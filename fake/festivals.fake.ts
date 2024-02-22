import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import festivals from './data/festivals.json'

export default defineFakeRoute([
    {
        url: '/fake/festivals.json',
        timeout: 1000,
        response: async () => {
            return festivals
        }
    }
])
