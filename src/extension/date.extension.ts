Date.prototype.getYearMonthDayTime = function (): string {
    return this.getFullYear() + '/' + (this.getMonth() + 1) + '/' + this.getDate()
}

Date.prototype.getMonthDayTime = function (): string {
    return this.getMonth() + 1 + '/' + this.getDate()
}

Date.prototype.getHourMinTime = function (): string {
    let time = ''
    const hours = this.getHours()
    hours < 10 ? (time = '0' + hours + ':') : (time = hours + ':')
    const min = this.getMinutes()
    min < 10 ? (time += '0' + min) : (time += min)
    return time
}

export {}
