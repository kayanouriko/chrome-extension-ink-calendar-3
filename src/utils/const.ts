/**
 * api 相关常量
 */

// 根路径
export const API_BASE = import.meta.env.DEV ? '/api' : 'https://splatoon3.ink'
/* 首页数据 **/
// 日程
export const API_SCHEDULES = '/data/schedules.json'
// 额外的国际化语言
export const API_LOCALE = '/data/locale/'
// 祭典
export const API_FESTIVALS = '/data/festivals.json'
/* 其他数据 **/
// 商店
export const API_GEAR = '/data/gear.json'
// X 排名
export const API_XRANK = '/data/xrank/xrank'

/**
 * 枚举
 */
// 请求状态
export type UpdateState = 'none' | 'loading' | 'success' | 'error'
