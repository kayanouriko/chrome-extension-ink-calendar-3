import { getGearData } from './fetch'
import { getGearDataFromLocal, setGearDataToLocal } from './storage'

export interface Splatnet {
    pickupBrand: PickupBrand
    limitedGears: Gear[]
}

export interface PickupBrand {
    image: { url: string }
    brand: {
        name: string
        id: string
        usualGearPower: {
            __splatoon3ink_id: string
            name: string
            image: { url: string }
        }
    }
    saleEndTime: string
    brandGears: Gear[]
    nextBrand: {
        id: string
        name: string
        image: { url: string }
    }
}

export interface Gear {
    id: string
    saleEndTime: string
    price: number
    gear: {
        __splatoon3ink_id: string
        name: string
        primaryGearPower: {
            __splatoon3ink_id: string
            name: string
            image: { url: string }
        }
        additionalGearPowers: GearPower[]
        image: { url: string }
        brand: {
            name: string
            id: string
            image: { url: string }
        }
    }
}

export interface GearPower {
    __splatoon3ink_id: string
    name: string
    image: { url: string }
}

export async function updateGearDatas() {
    if (import.meta.env.DEV) {
        const { data } = await import('../assets/json/gear.json')
        return data.gesotown as Splatnet
    }
    // 先检测本地是否有数据
    const { shouldFetch, data } = await getGearDataFromLocal()
    if (shouldFetch) {
        const { data } = await getGearData()
        setGearDataToLocal(data.gesotown)
        return data.gesotown
    } else {
        return data!
    }
}

class GearDataManager {
    datas: Splatnet
    constructor(datas: Splatnet) {
        this.datas = datas
    }
    // 获取 pickup 的品牌
    get pickupBrand() {
        return this.datas.pickupBrand
    }

    get limitedGears() {
        return this.datas.limitedGears
    }
}

let dataManager: GearDataManager | null = null

export function createDatas(datas: Splatnet) {
    if (dataManager === null) {
        dataManager = new GearDataManager(datas)
    }
    return dataManager
}

export function useDatas() {
    return dataManager!
}
