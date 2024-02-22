import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import schedules from './data/schedules.json'

export default defineFakeRoute([
    {
        url: '/fake/schedules.json',
        timeout: 1000,
        response: async () => {
            return schedules
        }
    }
])
