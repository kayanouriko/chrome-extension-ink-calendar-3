/**
 * schedules 的数据模型
 */

export interface Data {
    regularSchedules: {
        nodes: Schedule[]
    }
    bankaraSchedules: {
        nodes: Schedule[]
    }
    xSchedules: {
        nodes: Schedule[]
    }
    festSchedules: {
        nodes: Schedule[]
    }
    coopGroupingSchedule: {
        bannerImage: { url: string } | null
        regularSchedules: { nodes: CoopSchedule[] }
        bigRunSchedules: { nodes: CoopSchedule[] }
        teamContestSchedules: { nodes: CoopSchedule[] }
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
    regularMatchSetting?: Match
    bankaraMatchSettings?: Match[]
    leagueMatchSetting?: Match
    xMatchSetting?: Match
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
    __splatoon3ink_king_salmonid_guess?: string
    // 这是额外的标注是否为大型跑和团队打工竞赛, 'bigrun' 大型跑 | 'eggstrawork' 团队打工竞赛
    extType?: 'bigrun' | 'eggstrawork'
}

// 赛程信息
export interface Match {
    vsStages?: Stage[]
    vsRule?: Rule
    mode?: 'CHALLENGE' | 'OPEN' // 'CHALLENGE' 挑战 和 'OPEN' 开放
    __typename?: string
}

// 对战规则
export interface Rule {
    name: string
    rule: 'LOFT' | 'CLAM' | 'AREA' | 'GOAL' | 'TURF_WAR' // 'LOFT' 运塔 | 'CLAM' 蛤蜊 | 'AREA' 区域 | 'GOAL' 运鱼 | 'TURF_WAR' 涂地
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

/**
 * Festivals 的数据模型
 */
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
