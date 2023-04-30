import { getFestRegionType } from './useI18n'
import { getFestivalsData } from './fetch'
import { getCurrentLocale, getFestDataFromLocal, setFestDataToLocal } from './storage'

export type Festival = Record<'US' | 'EU' | 'JP' | 'AP', { data: { festRecords: { nodes: FestRecord[] } } }>

export interface FestRecord {
    __splatoon3ink_id: string
    state: string
    startTime: string
    endTime: string
    title: string
    lang: string
    image: { url: string }
    teams: FestTeam[]
    isVotable: boolean
}

export interface FestTeam {
    id: string
    teamName: string
    color: {
        a: number
        b: number
        g: number
        r: number
    }
    image: { url: string }
    result: {
        // 获胜者
        isWinner: boolean
        // 法螺获得率
        horagaiRatio: number
        isHoragaiRatioTop: boolean
        // 得票率
        voteRatio: number
        isVoteRatioTop: boolean
        // 开放
        regularContributionRatio: number
        isRegularContributionRatioTop: boolean
        // 挑战
        challengeContributionRatio: number
        isChallengeContributionRatioTop: boolean
        // 三色夺宝攻击
        tricolorContributionRatio: number
        isTricolorContributionRatioTop: boolean
    } | null
}

export async function updateFestDatas() {
    if (import.meta.env.DEV) {
        const festival = (await import('../assets/json/festivals.json')) as Festival
        const key = getFestRegionType('en-US')
        return festival[key].data.festRecords.nodes
    }
    // 先检测一下本地的数据
    const { shouldFetch, festival } = await getFestDataFromLocal()
    const code = (await getCurrentLocale()).code
    const key = getFestRegionType(code)
    if (shouldFetch) {
        const festival = await getFestivalsData()
        setFestDataToLocal(festival)
        return festival[key].data.festRecords.nodes
    } else {
        return festival![key].data.festRecords.nodes
    }
}

class FestDataManager {
    datas: FestRecord[]
    constructor(datas: FestRecord[]) {
        this.datas = datas
    }
}

let dataManager: FestDataManager | null = null

export function createDatas(datas: FestRecord[]) {
    if (dataManager === null) {
        dataManager = new FestDataManager(datas)
    }
    return dataManager
}

export function useDatas() {
    return dataManager!
}
