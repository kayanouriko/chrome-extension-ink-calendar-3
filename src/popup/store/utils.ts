import z from 'zod'

export const festivalState = z.enum(['SCHEDULED', 'CLOSED', 'FIRST_HALF', 'SECOND_HALF', 'RESULT'])
export type FestivalState = z.infer<typeof festivalState>

export function getYearMonthDayTime(date: Date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}

export function getMonthDayTime(date: Date) {
    return date.getMonth() + 1 + '/' + date.getDate()
}

export function getHourMinTime(date: Date) {
    const hours = date.getHours()
    const min = date.getMinutes()
    return `${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}`
}

export function getDurationTime(startTime: Date, endTime: Date) {
    return (
        getYearMonthDayTime(startTime) +
        ' ' +
        getHourMinTime(startTime) +
        ' - ' +
        getMonthDayTime(endTime) +
        ' ' +
        getHourMinTime(endTime)
    )
}
