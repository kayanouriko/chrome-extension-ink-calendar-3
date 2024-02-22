import z from 'zod'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useStorageStore } from '@common/chrome/storage'
import { useFestivalsDataStore } from './download'
import { getDurationTime, festivalState, FestivalState } from './utils'

const regionType = z.enum(['US', 'EU', 'JP', 'AP'])
// 支持的区域代码
export const appSupportedRegions: RegionType[] = ['US', 'EU', 'JP', 'AP']

const festivalTeamResult = z.object({
    isWinner: z.boolean(),
    horagaiRatio: z.number(),
    isHoragaiRatioTop: z.boolean(),
    voteRatio: z.number(),
    isVoteRatioTop: z.boolean(),
    regularContributionRatio: z.number(),
    isRegularContributionRatioTop: z.boolean(),
    challengeContributionRatio: z.number(),
    isChallengeContributionRatioTop: z.boolean(),
    tricolorContributionRatio: z.union([z.null(), z.number()]),
    isTricolorContributionRatioTop: z.union([z.null(), z.boolean()])
})

const festivalTeam = z.object({
    result: z.union([z.null(), festivalTeamResult]),
    id: z.string(),
    teamName: z.string(),
    color: z
        .object({
            a: z.number(),
            b: z.number(),
            g: z.number(),
            r: z.number()
        })
        .transform(color => rgbaColor(color)),
    image: z.object({ url: z.string() }).transform(({ url }) => url)
})

const festivalRecord = z
    .object({
        __splatoon3ink_id: z.string(),
        id: z.string(),
        state: festivalState,
        startTime: z.string(),
        endTime: z.string(),
        title: z.string(),
        image: z.object({ url: z.string() }).transform(({ url }) => url),
        teams: z.array(festivalTeam)
    })
    .transform(({ state, startTime, endTime, ...others }) => ({
        startTime,
        endTime,
        ...others,
        ...getFestState(state, endTime),
        durationTime: getDurationTime(new Date(startTime), new Date(endTime))
    }))

export const festival = z.record(
    regionType,
    z
        .object({
            data: z.object({
                festRecords: z.object({
                    nodes: z.array(festivalRecord)
                })
            })
        })
        .transform(
            ({
                data: {
                    festRecords: { nodes }
                }
            }) => nodes
        )
)

export type RegionType = z.infer<typeof regionType>
export type Festival = z.infer<typeof festival>
export type FestivalRecord = z.infer<typeof festivalRecord>
export type FestivalTeam = z.infer<typeof festivalTeam>
export type FestivalTeamResult = z.infer<typeof festivalTeamResult>

export const useFestivalsStore = defineStore('festivals', () => {
    const festivals = computed(() => {
        const code = useStorageStore().appCurrentRegionCode
        return useFestivalsDataStore().data?.[code] ?? []
    })
    const current = computed(() => festivals.value.find(f => f.state !== 'CLOSED'))
    // 下面的是更新的请求逻辑
    // 因为首页请求的时候有可能不请求祭典的数据, 当用户想要查看祭典数据时候需要重新请求
    const isUpdating = ref(false)
    const isError = ref(false)
    // 更新数据
    async function update() {
        // 如果 data 存在, 则不需要请求
        if (useFestivalsDataStore().data) {
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
            await useFestivalsDataStore().update()
        } catch (error) {
            isError.value = true
        } finally {
            isUpdating.value = false
        }
    }
    return { current, festivals, isUpdating, isError, update }
})

//==========辅助函数==========
function getState(state: FestivalState, endTime: string): FestivalState {
    if (state !== 'CLOSED') return state
    const now = Date.now()
    const end = new Date(endTime).getTime()
    if (now - end > 3 * 24 * 60 * 60 * 1000) {
        return 'CLOSED'
    }
    return 'RESULT'
}

function rgbaColor(rgba: { r: number; g: number; b: number; a: number }) {
    return `rgba(${rgba.r * 255}, ${rgba.g * 255}, ${rgba.b * 255}, ${rgba.a * 255})`
}

// 根据 language code 获取所在的祭典服务器区域
// 这里只有 chrome stroage 获取 undefined 的时候才会调用, 当用户在设置里面自行修改以后则以设置的为准.
export function getFestRegionType(code: string): RegionType {
    switch (code) {
        case 'en-US':
        case 'es-MX':
        case 'fr-CA':
            return 'US'
        case 'en-GB':
        case 'de-DE':
        case 'es-ES':
        case 'fr-FR':
        case 'it-IT':
        case 'nl-NL':
        case 'ru-RU':
            return 'EU'
        case 'ko-KR':
        case 'zh-CN':
        case 'zh-TW':
            return 'AP'
        default:
            return 'JP'
    }
}

// 获取祭典状态的国际化文本
function getFestState(state: FestivalState, endTime: string) {
    state = getState(state, endTime)
    let stateText = ''
    switch (state) {
        case 'SCHEDULED':
            stateText = 'time.uncoming'
            break
        case 'FIRST_HALF':
        case 'SECOND_HALF':
            stateText = 'time.now'
            break
        case 'RESULT':
            stateText = 'splatfest.result'
            break
        default:
            break
    }
    return { state, stateText }
}
