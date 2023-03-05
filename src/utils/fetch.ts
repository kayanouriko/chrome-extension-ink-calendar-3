import { Data } from './datas'
import { Splatnet } from './gearDatas'
import { version } from '../manifest.json'
import { getCurrentLocale } from './storage'

const SCHEDULE_URL = 'https://splatoon3.ink/data/schedules.json'
const GEAR_URL = 'https://splatoon3.ink/data/gear.json'
const LOCALE_URL = 'https://splatoon3.ink/data/locale/'

// splatoon3ink data access 的要求, 最好附上联系方式的 User-Agent
const headers = {
    'User-Agent': `ChromeExtensionInkCalendar3/${version} kayanouriko@icloud.com`
}

async function getScheduleData() {
    const response = await fetch(SCHEDULE_URL, { headers })
    return response.json() as Promise<{ data: Data }>
}

async function getGearData() {
    const response = await fetch(GEAR_URL, { headers })
    return response.json() as Promise<{ data: { gesotown: Splatnet } }>
}

async function getLocaleData() {
    const code = (await getCurrentLocale()).code
    const response = await fetch(LOCALE_URL + code + '.json', { headers })
    return response.json()
}

export { getScheduleData, getGearData, getLocaleData }
