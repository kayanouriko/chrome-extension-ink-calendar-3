import z from 'zod'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useGearDataStore } from './download'
import { getYearMonthDayTime, getHourMinTime, getMonthDayTime } from './utils'

const imageTransform = z.object({ url: z.string() }).transform(({ url }) => url)

// 孔洞详情
const power = z.object({
    __splatoon3ink_id: z.string(),
    name: z.string(),
    image: imageTransform
})

// 品牌详情
const brand = z.object({
    name: z.string(),
    id: z.string(),
    // 品牌的宣传大图
    image: imageTransform.optional(),
    usualGearPower: z.object({
        __splatoon3ink_id: z.string(),
        name: z.string(),
        image: imageTransform
    })
})

// 装备详情
const gear = z.object({
    __splatoon3ink_id: z.string(),
    name: z.string(),
    image: imageTransform,
    // 主孔
    primaryGearPower: power,
    // 副孔
    additionalGearPowers: z.array(power),
    // 所属品牌
    brand
})

// 销售信息详情
const brandGear = z
    .object({
        id: z.string(),
        saleEndTime: z.string(),
        price: z.number(),
        gear
    })
    .transform(({ saleEndTime, ...others }) => ({
        ...others,
        saleEndTime,
        showTime: (() => {
            const now = new Date()
            const saleEnd = new Date(saleEndTime)
            const monthDay = getMonthDayTime(saleEnd)
            const hourMin = getHourMinTime(saleEnd)
            let showTime = hourMin
            if (saleEnd.setHours(0, 0, 0, 0) !== now.setHours(0, 0, 0, 0)) {
                showTime = monthDay + ' ' + hourMin
            }
            return showTime
        })()
    }))

// 精选商品
const pickupBrand = z.object({
    image: imageTransform,
    brand,
    saleEndTime: z.string().transform(t => {
        const date = new Date(t)
        return getYearMonthDayTime(date) + ' ' + getHourMinTime(date)
    }),
    // 销售的商品列表
    brandGears: z.array(brandGear),
    // 下一个精选品牌
    nextBrand: z.object({
        name: z.string(),
        id: z.string(),
        image: imageTransform
    })
})

const limitedGears = z.array(brandGear)

export const gesotown = z
    .object({
        data: z.object({
            gesotown: z.object({
                pickupBrand,
                limitedGears
            })
        })
    })
    .transform(({ data: { gesotown } }) => gesotown)

export type Gesotown = z.infer<typeof gesotown>
export type PickupBrand = z.infer<typeof pickupBrand>
export type BrandGear = z.infer<typeof brandGear>
export type Gear = z.infer<typeof gear>

export const useGearStore = defineStore('gear', () => {
    const gesotown = computed(() => useGearDataStore().data)
    const isUpdating = ref(false)
    const isError = ref(false)
    async function update() {
        if (useGearDataStore().data) {
            isUpdating.value = false
            isError.value = false
            return
        }
        // TODO: BUG
        // 如果正在更新也不需要请求
        // 这里这个判断是由于在 menu/fest 页面由于 keeplive 和 route-view 的问题, 页面会初始化两次, 所以在外面会调用两次该函数, 这里多做一个处理避免重复请求
        // 目前没有找到解决的方法
        // 讨论链接: https://github.com/vuejs/router/issues/626
        if (isUpdating.value) return
        isUpdating.value = true
        isError.value = false
        try {
            await useGearDataStore().update()
        } catch (error) {
            isError.value = true
        } finally {
            isUpdating.value = false
        }
    }
    return { isUpdating, isError, gesotown, update }
})
