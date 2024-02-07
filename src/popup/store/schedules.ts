import z from 'zod'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useSchedulesDataStore } from './download'
import { useFestivalsStore } from './festivals'
import {
    getYearMonthDayTime,
    getHourMinTime,
    getMonthDayTime,
    getDurationTime,
    festivalState,
    FestivalState
} from './utils'

// 'LOFT' 运塔 | 'CLAM' 蛤蜊 | 'AREA' 区域 | 'GOAL' 运鱼 | 'TURF_WAR' 涂地
const ruleType = z.enum(['TURF_WAR', 'LOFT', 'CLAM', 'AREA', 'GOAL'])

// 'upcoming' 即将举办 , 'active' 举办中, 'past' 已结束
const scheduleStatus = z.enum(['upcoming', 'active', 'past'])

const imageTransform = z.object({ url: z.string() }).transform(({ url }) => url)

const scheduleStage = z.object({
    id: z.string(),
    name: z.string(),
    image: imageTransform
})

const scheduleRule = z
    .object({
        name: z.string(),
        rule: ruleType,
        id: z.string()
    })
    .transform(({ rule, ...others }) => ({
        rule,
        ...others,
        icon: getRuleIcon(rule)
    }))

const scheduleSetting = z
    .object({
        vsStages: z.array(scheduleStage),
        vsRule: scheduleRule,
        bankaraMode: z.enum(['CHALLENGE', 'OPEN']).optional(),
        festMode: z.enum(['CHALLENGE', 'REGULAR']).optional()
    })
    .transform(({ bankaraMode, festMode, ...others }) => ({
        ...others,
        mode: festMode ? festMode : bankaraMode,
        modeName: getModeName(bankaraMode, festMode)
    }))

const schedule = z.object({
    startTime: z.string(),
    endTime: z.string()
})

const regularSchedule = schedule
    .extend({
        regularMatchSetting: z.union([z.null(), scheduleSetting])
    })
    .transform(({ startTime, regularMatchSetting, ...others }) => ({
        startTime,
        ...others,
        matches: regularMatchSetting ? [regularMatchSetting] : null,
        isEarlyHour: isEarlyHour(startTime),
        yearShowTime: getYearMonthDayTime(new Date(startTime)),
        showTime: getHourMinTime(new Date(startTime))
    }))

const bankaraSchedule = schedule
    .extend({
        bankaraMatchSettings: z.union([z.null(), z.array(scheduleSetting)])
    })
    .transform(({ startTime, bankaraMatchSettings, ...others }) => ({
        startTime,
        ...others,
        matches: bankaraMatchSettings,
        isEarlyHour: isEarlyHour(startTime),
        yearShowTime: getYearMonthDayTime(new Date(startTime)),
        showTime: getHourMinTime(new Date(startTime))
    }))

const xSchedule = schedule
    .extend({
        xMatchSetting: z.union([z.null(), scheduleSetting])
    })
    .transform(({ startTime, xMatchSetting, ...others }) => ({
        startTime,
        ...others,
        matches: xMatchSetting ? [xMatchSetting] : null,
        isEarlyHour: isEarlyHour(startTime),
        yearShowTime: getYearMonthDayTime(new Date(startTime)),
        showTime: getHourMinTime(new Date(startTime))
    }))

const festSchedule = schedule
    .extend({
        festMatchSettings: z.union([z.null(), z.array(scheduleSetting)])
    })
    .transform(({ startTime, festMatchSettings, ...others }) => ({
        startTime,
        ...others,
        matches: festMatchSettings,
        isEarlyHour: isEarlyHour(startTime),
        yearShowTime: getYearMonthDayTime(new Date(startTime)),
        showTime: getHourMinTime(new Date(startTime))
    }))

const eventScheduleMatch = z.object({
    id: z.string(),
    name: z.string(),
    desc: z.string(),
    regulation: z.string()
})

const eventScheduleSetting = z.object({
    vsStages: z.array(scheduleStage),
    vsRule: scheduleRule,
    leagueMatchEvent: eventScheduleMatch
})

const eventSchedule = z
    .object({
        leagueMatchSetting: eventScheduleSetting,
        timePeriods: z.array(
            z
                .object({
                    startTime: z.string(),
                    endTime: z.string()
                })
                .transform(({ startTime, endTime }) => ({
                    startTime,
                    endTime,
                    status: getScheduleStatus(startTime, endTime),
                    durationTime: getDurationTime(new Date(startTime), new Date(endTime)),
                    showTime: (() =>
                        getMonthDayTime(new Date(startTime)) +
                        ' ' +
                        getHourMinTime(new Date(startTime)) +
                        ' - ' +
                        getMonthDayTime(new Date(endTime)) +
                        ' ' +
                        getHourMinTime(new Date(endTime)))()
                }))
        )
    })
    .transform(({ leagueMatchSetting, timePeriods }) => ({
        leagueMatchSetting,
        timePeriods,
        currentTimePeriod: timePeriods.filter(timePeriod => timePeriod.status !== 'past').shift(),
        nextTimePeriods: (() => {
            const nextTimePeriods = timePeriods.filter(timePeriod => timePeriod.status !== 'past')
            nextTimePeriods.shift()
            return nextTimePeriods
        })()
    }))

const coopSchedule = z
    .object({
        startTime: z.string(),
        endTime: z.string(),
        mode: z.string().optional(),
        modeIcon: z.string().optional(),
        setting: z.object({
            boss: z.union([
                z.null(),
                z
                    .object({
                        name: z.string(),
                        id: z.string()
                    })
                    .transform(({ name, ...others }) => ({
                        name,
                        ...others,
                        icon: getBossIcon(name.toLowerCase())
                    }))
            ]),
            coopStage: z.object({
                name: z.string(),
                id: z.string(),
                thumbnailImage: imageTransform
            }),
            weapons: z.array(
                z.object({
                    __splatoon3ink_id: z.string(),
                    image: imageTransform,
                    name: z.string()
                })
            )
        })
    })
    .transform(({ startTime, endTime, ...ohters }) => ({
        startTime,
        endTime,
        ...ohters,
        status: getScheduleStatus(startTime, endTime),
        showTime: getMonthDayTime(new Date(startTime)) + ' ' + getHourMinTime(new Date(startTime)),
        durationTime: getDurationTime(new Date(startTime), new Date(endTime))
    }))

const coopGroupingSchedule = z.object({
    bannerImage: z.union([z.null(), imageTransform]),
    regularSchedules: z.object({ nodes: z.array(coopSchedule) }).transform(({ nodes }) => nodes),
    bigRunSchedules: z
        .object({
            nodes: z.array(
                coopSchedule.transform(schedule => ({
                    ...schedule,
                    mode: 'salmonrun.bigrun',
                    modeIcon: '/assets/images/rule/bigrun.webp'
                }))
            )
        })
        .transform(({ nodes }) => nodes),
    teamContestSchedules: z
        .object({
            nodes: z.array(
                coopSchedule.transform(schedule => ({
                    ...schedule,
                    mode: 'salmonrun.eggstrawork',
                    modeIcon: '/assets/images/rule/eggstra.webp'
                }))
            )
        })
        .transform(({ nodes }) => nodes)
})

const tricolorStage = z.object({
    name: z.string(),
    image: imageTransform,
    id: z.string()
})

const currentFest = z.union([
    z.null(),
    z
        .object({
            startTime: z.string(),
            endTime: z.string(),
            midtermTime: z.string(),
            state: festivalState,
            tricolorStage
        })
        .transform(({ startTime, endTime, state, midtermTime, ...others }) => ({
            startTime,
            endTime,
            state,
            ...others,
            durationTime: getDurationTime(new Date(startTime), new Date(endTime)),
            upcomingTime: getYearMonthDayTime(new Date(startTime)),
            stateText: getFestStateText(state),
            midtermTime: (() =>
                getYearMonthDayTime(new Date(midtermTime)) + ' ' + getHourMinTime(new Date(midtermTime)))()
        }))
])

export const schedulesData = z
    .object({
        data: z.object({
            regularSchedules: z
                .object({
                    nodes: z.array(regularSchedule)
                })
                .transform(({ nodes }) => nodes.filter(schedule => schedule.matches !== null)),
            bankaraSchedules: z
                .object({
                    nodes: z.array(bankaraSchedule)
                })
                .transform(({ nodes }) => nodes.filter(schedule => schedule.matches !== null)),
            xSchedules: z
                .object({
                    nodes: z.array(xSchedule)
                })
                .transform(({ nodes }) => nodes.filter(schedule => schedule.matches !== null)),
            eventSchedules: z
                .object({
                    nodes: z.array(eventSchedule)
                })
                .transform(({ nodes }) => nodes),
            festSchedules: z
                .object({
                    nodes: z.array(festSchedule)
                })
                .transform(({ nodes }) => nodes),
            currentFest,
            coopGroupingSchedule
        })
    })
    .transform(({ data }) => ({
        ...data,
        nextUpdateTime: (() => {
            const schedule = data.festSchedules.find(_ => true)
            return schedule?.endTime
        })()
    }))

export type SchedulesData = z.infer<typeof schedulesData>
type RegularSchedule = z.infer<typeof regularSchedule>
type BankaraSchedule = z.infer<typeof bankaraSchedule>
type XSchedule = z.infer<typeof xSchedule>
export type Schedule = RegularSchedule | BankaraSchedule | XSchedule
export type ScheduleStatus = z.infer<typeof scheduleStatus>
export type ScheduleRule = z.infer<typeof scheduleRule>
export type ScheduleStage = z.infer<typeof scheduleStage>
export type TricolorStage = z.infer<typeof tricolorStage>
export type RuleType = z.infer<typeof ruleType>
export type EventSchedule = z.infer<typeof eventSchedule>
export type CoopSchedule = z.infer<typeof coopSchedule>

// 一般比赛
export const useRegularSchedulesStore = defineStore('schedules/regular', () => {
    const schedules = computed(() => useSchedulesDataStore().data?.regularSchedules ?? [])
    return { schedules }
})

// 蛮颓比赛
export const useBankaraSchedulesStore = defineStore('schedules/bankara', () => {
    const schedules = computed(() => useSchedulesDataStore().data?.bankaraSchedules ?? [])
    return { schedules }
})

// x 比赛
export const useXSchedulesStore = defineStore('schedules/x', () => {
    const schedules = computed(() => useSchedulesDataStore().data?.xSchedules ?? [])
    return { schedules }
})

// 活动比赛
export const useEventSchedulesStore = defineStore('schedules/event', () => {
    const schedules = computed(() => useSchedulesDataStore().data?.eventSchedules ?? [])
    const isEventAvailable = computed(() => schedules.value.length > 0)
    return { isEventAvailable, schedules }
})

// 鲑鱼跑
export const useCoopSchedulesStore = defineStore('schedules/coop', () => {
    // 当期活动的大图
    const bannerImage = computed(() => useSchedulesDataStore().data?.coopGroupingSchedule.bannerImage)
    const regularSchedules = computed(() => useSchedulesDataStore().data?.coopGroupingSchedule.regularSchedules ?? [])
    const bigRunSchedules = computed(() => useSchedulesDataStore().data?.coopGroupingSchedule.bigRunSchedules ?? [])
    const teamContestSchedules = computed(
        () => useSchedulesDataStore().data?.coopGroupingSchedule.teamContestSchedules ?? []
    )
    const spSchedule = computed(() => {
        let schedule = bigRunSchedules.value.find(schedule => schedule.status === 'active')
        if (!schedule) schedule = teamContestSchedules.value.find(schedule => schedule.status === 'active')
        return schedule
    })
    // 包含大型跑和团队打工的日程
    const schedules = computed(() => {
        const schedules = [...regularSchedules.value, ...bigRunSchedules.value, ...teamContestSchedules.value]
        schedules.sort((a, b) => {
            const aDate = new Date(a.startTime)
            const bDate = new Date(b.startTime)
            if (aDate > bDate) {
                // a 时间比 b 时间晚, b 排前面
                return 1
            } else if (aDate < bDate) {
                // a 时间比 b 时间早, a 排前面
                return -1
            } else {
                // a 时间等于 b 时间
                // 说明 a 是特殊打工, b 是普通打工
                if (a.mode && !b.mode) return -1
                // 说明 b 是特殊打工, a 是普通打工
                else if (!a.mode && b.mode) return 1
                else return 0
            }
        })
        return schedules
    })
    return { bannerImage, spSchedule, regularSchedules, schedules }
})

// 祭典
export const useFestSchedulesStore = defineStore('schedules/fest', () => {
    // 注意, 这里的 currentFest 取 useSchedulesDataStore data 里面 currentFest 的值, 因为我们祭典不是预热状态不会请求 useFestivalsStore 的数据, 所有的关于祭典的状态都由 currentFest 来控制.
    const currentFest = computed(() => useSchedulesDataStore().data?.currentFest)
    const currentFestRecord = computed(() => useFestivalsStore().current)
    // 由于要拿祭典的时间作为更新时间, 所以这里才筛选出 matches 为 null 的日程
    const schedules = computed(
        () => useSchedulesDataStore().data?.festSchedules.filter(schedule => schedule.matches !== null) ?? []
    )
    return { currentFest, currentFestRecord, schedules }
})

//========== 辅助工具类 ==========
// 获取祭典状态的国际化文本
function getFestStateText(state: FestivalState) {
    switch (state) {
        case 'SCHEDULED':
            return 'time.uncoming'
        case 'FIRST_HALF':
        case 'SECOND_HALF':
            return 'time.now'
        default:
            return ''
    }
}

// 如果是 0 点, 则需要显示年月日的黄色标题
function isEarlyHour(startTime: string) {
    const date = new Date(startTime)
    return date.getHours() === 0
}

// 获取蛮颓比赛和祭典的模式标识
function getModeName(bankaraMode?: 'CHALLENGE' | 'OPEN', festMode?: 'CHALLENGE' | 'REGULAR') {
    function getFestModeName(festMode?: 'CHALLENGE' | 'REGULAR') {
        switch (festMode) {
            case 'CHALLENGE':
                return 'splatfest.pro'
            case 'REGULAR':
                return 'splatfest.open'
            default:
                return undefined
        }
    }

    function getBankaraModeName(bankaraMode?: 'CHALLENGE' | 'OPEN') {
        switch (bankaraMode) {
            case 'CHALLENGE':
                return 'schedule.series'
            case 'OPEN':
                return 'schedule.open'
            default:
                return undefined
        }
    }
    return festMode ? getFestModeName(festMode) : getBankaraModeName(bankaraMode)
}

// 获取规则图标
function getRuleIcon(rule: RuleType) {
    // 'LOFT' 运塔 | 'CLAM' 蛤蜊 | 'AREA' 区域 | 'GOAL' 运鱼 | 'TURF_WAR' 涂地
    switch (rule) {
        case 'TURF_WAR':
            return '/assets/images/rule/regular.webp'
        case 'LOFT':
            return '/assets/images/rule/yagura.webp'
        case 'CLAM':
            return '/assets/images/rule/asari.webp'
        case 'AREA':
            return '/assets/images/rule/area.webp'
        case 'GOAL':
            return '/assets/images/rule/hoko.webp'
    }
}

// 获取打工 BOSS 图标
function getBossIcon(boss: string) {
    const bosses = ['cohozuna', 'horrorboros', 'megalodontia']
    if (bosses.includes(boss)) {
        return `/assets/images/boss/${boss}.webp`
    }
    return '/assets/images/boss/boss.png'
}

// 转换赛程等状态
function getScheduleStatus(startTime: string, endTime: string): ScheduleStatus {
    const start = Date.parse(startTime)
    const end = Date.parse(endTime)
    const now = new Date().getTime()
    if (start > now) {
        return 'upcoming'
    } else if (start <= now && end >= now) {
        return 'active'
    } else {
        return 'past'
    }
}
