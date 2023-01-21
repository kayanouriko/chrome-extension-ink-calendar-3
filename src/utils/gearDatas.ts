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

// TODO: 需要网络请求等操作
let datas: Splatnet | null = null

// 获取 pickup 的品牌
export function getPickupBrand() {
    return datas!.pickupBrand
}

export function getLimitedGears() {
    return datas!.limitedGears
}

export async function updateGearDatas() {
    // 先检测本地是否有数据
    const { shouldFetch, data } = await getGearDataFromLocal()
    if (shouldFetch) {
        const { data } = await getGearData()
        datas = data.gesotown
        setGearDataToLocal(data.gesotown)
    } else {
        datas = data!
    }
}
