import { getXRankDataFromLocal, setXRankDataToLocal } from './storage'
import { getXRankData } from './fetch'

export interface Season {
    __splatoon3ink_id: string
    id: string
    name: string
    startTime: string
    endTime: string
    lastUpdateTime: string
    isCurrent: boolean
    xRankingAr: { nodes: TopPlayer[] } // 真格区域
    xRankingCl: { nodes: TopPlayer[] } // 真格蛤蜊
    xRankingGl: { nodes: TopPlayer[] } // 真格鱼虎
    xRankingLf: { nodes: TopPlayer[] } // 真格塔楼
}

export interface TopPlayer {
    id: string
    name: string
    xPower: number
    rank: number
    weapon: PlayerWeapon
    byname: string
    nameId: string
    nameplate: {
        badges: {
            id: string
            image: { url: string }
        }[]
        background: {
            textColor: {
                a: number
                b: number
                g: number
                r: number
            }
            image: { url: string }
            id: string
        }
    }
    rule?: 'LOFT' | 'CLAM' | 'AREA' | 'GOAL' // 'LOFT' 运塔 | 'CLAM' 蛤蜊 | 'AREA' 区域 | 'GOAL' 运鱼 | 'TURF_WAR' 涂地
}

export interface PlayerWeapon {
    name: string
    id: string
    image: { url: string }
    image2d: { url: string }
    image2dThumbnail: { url: string }
    image3d: { url: string }
    image3dThumbnail: { url: string }
    subWeapon: {
        name: string
        id: string
        image: { url: string }
    }
    specialWeapon: {
        name: string
        id: string
        image: { url: string }
    }
}

export async function updateXRankDatas(type?: 'tentatek' | 'takoroka') {
    if (import.meta.env.DEV) {
        const data = (await import('../assets/json/xrank.tentatek.json')) as {
            data: { xRanking: { currentSeason: Season } }
        }
        return data.data.xRanking.currentSeason
    }
    const { shouldFetch, season } = await getXRankDataFromLocal()
    if (shouldFetch) {
        const data = await getXRankData()
        setXRankDataToLocal(data.data.xRanking.currentSeason)
        return data.data.xRanking.currentSeason
    } else {
        return season!
    }
}

class XRankDataManager {
    datas: Season
    constructor(datas: Season) {
        this.datas = datas
    }
}

let dataManager: XRankDataManager | null = null

export function createDatas(datas: Season) {
    if (dataManager === null) {
        dataManager = new XRankDataManager(datas)
    }
    return dataManager
}

export function useDatas() {
    return dataManager!
}
