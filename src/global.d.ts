declare global {
    interface Date {
        // 获取'YYYY/MM/dd'的时间格式
        getYearMonthDayTime(): string
        // 获取'MM/dd'的时间格式
        getMonthDayTime(): string
        // 获取'HH:mm'的时间格式
        getHourMinTime(): string
    }
}

export {}
