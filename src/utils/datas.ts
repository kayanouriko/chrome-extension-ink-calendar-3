import '../extension/date.extension'
import { getScheduleData, getLocaleData } from './fetch'
import {
    getLocaleDataFromLocal,
    getScheduleDataFromLocal,
    setLocaleDataToLocal,
    setScheduleDataToLocal
} from './storage'

// 接口部分

// 全部数据模型
export interface Data {
    regularSchedules: {
        nodes: Schedule[]
    }
    bankaraSchedules: {
        nodes: Schedule[]
    }
    leagueSchedules: {
        nodes: Schedule[]
    }
    xSchedules: {
        nodes: Schedule[]
    }
    festSchedules: {
        nodes: Schedule[]
    }
    coopGroupingSchedule: {
        regularSchedules: { nodes: CoopSchedule[] }
        bigRunSchedules: { nodes: CoopSchedule[] }
    }
    currentFest: Splatfest | null
}

// 祭典信息
export interface Splatfest {
    id: string
    title: string
    startTime: string
    endTime: string
    midtermTime: string
    state: string
    teams: {
        id: string
        color: { a: number; b: number; g: number; r: number }
    }[]
    tricolorStage: {
        name: string
        image: { url: string }
        id: string
    }
}

// 赛程
export interface Schedule {
    startTime: string
    endTime: string
    regularMatchSetting?: Match | null
    bankaraMatchSettings?: Match[] | null
    leagueMatchSetting?: Match | null
    xMatchSetting?: Match | null
    festMatchSetting: Match | null
}

// 鲑鱼跑赛程
export interface CoopSchedule {
    startTime: string
    endTime: string
    setting: {
        coopStage: CoopStage
        weapons: CoopWeapon[]
    }
}

// 赛程信息
export interface Match {
    vsStages?: Stage[]
    vsRule?: Rule
    mode?: string // 'CHALLENGE' 挑战 和 'OPEN' 开放
    __typename?: string
}

// 对战规则
export interface Rule {
    name: string
    rule: string // 'LOFT' 运塔 | 'CLAM' 蛤蜊 | 'AREA' 区域 | 'GOAL' 运鱼 | 'TURF_WAR' 涂地
    id: string
}

// 对战地图信息
export interface Stage {
    vsStageId: number
    name: string
    image: {
        url: string
    }
    id: string
}

// 鲑鱼跑的地图信息
export interface CoopStage {
    name: string
    id: string
    thumbnailImage: {
        url: string
    }
}

// 鲑鱼跑的武器信息
export interface CoopWeapon {
    __splatoon3ink_id: string
    name: string
    image: {
        url: string
    }
}

// 存在的类型
export enum BattleType {
    Bankara, // 真格
    Regular, // 涂地
    X, // x 排位
    Splatfest, // 祭典
    Salmonrun // 鲑鱼跑
}

// 获取 data 信息
let datas: Data | null = null

class DataManager {
    async initData(code: string) {
        // 先检测本地是否有数据
        const { shouldFetch, data } = await getScheduleDataFromLocal()
        if (shouldFetch) {
            const { data } = await getScheduleData()
            datas = data
            setScheduleDataToLocal(data)
        } else {
            datas = data!
        }
        // 判断是否需要更新 locale
        // 只有当 schedule 不需要更新, 且本地语言更新时间不超过两小时的时候不需要更新 locale
        if (!shouldFetch) {
            const localeData = await getLocaleDataFromLocal(code)
            if (localeData) {
                const { time, locale } = localeData
                const ms = new Date().getTime() - time
                if (ms > 0 && ms / 1000 / 60 / 60 < 2) {
                    console.log('[ink calendar 3]额外的国际化语言不需要联网更新')
                    return locale
                }
            }
        }
        // 其余情况需要更新 locale
        const locale = await getLocaleData(code)
        setLocaleDataToLocal(code, locale)
        return locale
    }
    // 数据源
    get datas() {
        return datas!
    }
    // 是否是祭典状态
    get isFestTime() {
        return datas!.currentFest !== null
    }
    // 获取目前可以显示的时间表
    get currentBattleTypes() {
        let battleTypes = []
        // 如果有祭典, 添加祭典
        if (this.isFestTime) {
            battleTypes.push(BattleType.Splatfest)
        }
        if (this.regularSchedules.length > 0) {
            // 说明祭典快结束, 同时显示
            battleTypes.push(...[BattleType.Regular, BattleType.Bankara, BattleType.X])
        }
        battleTypes.push(BattleType.Salmonrun)
        return battleTypes
    }
    // 获取模式对应图标
    getTypeIcon(type: BattleType) {
        switch (type) {
            case BattleType.Regular:
                return '/images/regular.svg'
            case BattleType.Bankara:
                return '/images/bankara.svg'
            case BattleType.X:
                return '/images/x.svg'
            case BattleType.Splatfest:
                return '/images/tricolor.png'
            case BattleType.Salmonrun:
                return '/images/coop.svg'
        }
    }
    // 获取模式对应名字
    getTypeTitle(type: BattleType) {
        switch (type) {
            case BattleType.Regular:
                return 'navbar.regular'
            case BattleType.Bankara:
                return 'navbar.bankara'
            case BattleType.X:
                return 'navbar.x'
            case BattleType.Splatfest:
                return 'navbar.splatfest'
            case BattleType.Salmonrun:
                return 'navbar.salmonrun'
        }
    }
    // 获取祭典持续时间
    getFestTime() {
        const currentFest = datas!.currentFest as Splatfest
        const startTime = new Date(currentFest.startTime)
        const endTime = new Date(currentFest.endTime)
        return (
            startTime.getYearMonthDayTime() +
            ' ' +
            startTime.getHourMinTime() +
            ' - ' +
            endTime.getMonthDayTime() +
            ' ' +
            endTime.getHourMinTime()
        )
    }
    // 获取祭典的主题
    getFestQuestion() {
        const currentFest = datas!.currentFest as Splatfest
        return currentFest.title
    }
    // 获取祭典三色夺宝比赛的开始时间
    getTricolorBattleTime() {
        const currentFest = datas!.currentFest as Splatfest
        const time = new Date(currentFest.midtermTime)
        return time.getYearMonthDayTime() + ' ' + time.getHourMinTime()
    }
    // 获取三色夺宝比赛的地图信息
    getTricolorStage() {
        const currentFest = datas!.currentFest as Splatfest
        return currentFest.tricolorStage
    }
    // 获取涂地时间表的数组
    get regularSchedules() {
        const schedules = datas!.regularSchedules.nodes
        return schedules.filter(s => s.regularMatchSetting !== null)
    }
    // 获取真格时间表(挑战和开放)的数组
    get bankaraSchedules() {
        const schedules = datas!.bankaraSchedules.nodes
        return schedules.filter(s => s.bankaraMatchSettings !== null)
    }
    // 获取 x 段位时间表的数组
    get xSchedules() {
        const schedules = datas!.xSchedules.nodes
        return schedules.filter(s => s.xMatchSetting !== null)
    }
    // 获取祭典时间表的数组
    get festSchedules() {
        const schedules = datas!.festSchedules.nodes
        return schedules.filter(s => s.festMatchSetting !== null)
    }
    get isBigRun() {
        const coopSchedule = datas!.coopGroupingSchedule
        return coopSchedule.bigRunSchedules.nodes.length > 0
    }
    // 获取鲑鱼跑时间表的数组
    get coopSchedules() {
        const coopSchedule = datas!.coopGroupingSchedule
        if (coopSchedule.regularSchedules.nodes.length > 0) {
            return coopSchedule.regularSchedules.nodes
        } else {
            return coopSchedule.bigRunSchedules.nodes
        }
    }
    // 返回对应规则的 icon
    getRuleIcon(rule: string) {
        // 'LOFT' 运塔 | 'CLAM' 蛤蜊 | 'AREA' 区域 | 'GOAL' 运鱼 | 'TURF_WAR' 涂地
        switch (rule) {
            case 'TURF_WAR':
                return '/images/regular.svg'
            case 'LOFT':
                return '/images/yagura.svg'
            case 'CLAM':
                return '/images/asari.svg'
            case 'AREA':
                return '/images/area.svg'
            case 'GOAL':
                return '/images/hoko.svg'
            default:
                return ''
        }
    }
    // 返回真格模式的名字
    getModeTitle(mode: string) {
        // 'CHALLENGE' 挑战 和 'OPEN' 开放
        switch (mode) {
            case 'CHALLENGE':
                return 'schedule.series'
            case 'OPEN':
                return 'schedule.open'
            default:
                return ''
        }
    }
    // 获取'HH:mm'格式的时间
    getTime(timeString: string) {
        return new Date(timeString).getHourMinTime()
    }
    // 判断是不是同一天和年月日的格式化
    isSameDay(timeString: string) {
        const date = new Date(timeString)
        if (date.getHours() !== 0 || date.getMinutes() !== 0) {
            // 不是凌晨的时间直接跳过不用显示
            return {
                shouldShowTime: false,
                showTime: ''
            }
        }
        // 开始判断是否需要显示年月日
        const nowDate = new Date()
        return {
            shouldShowTime: nowDate.setHours(0, 0, 0, 0) !== date.setHours(0, 0, 0, 0),
            showTime: date.getYearMonthDayTime()
        }
    }
}

const dataManager = new DataManager()

export function useData() {
    return dataManager
}
