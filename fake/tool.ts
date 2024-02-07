export function sleep(millisecond: number = random(0, 2000)) {
    return new Promise(resolve => setTimeout(resolve, millisecond))
}

function random(min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min
}
