
export const getDate_of_a_day = (day: number): Date => {
    return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * day)
}

export const getDate_of_a_minute = (minute: number): Date => {
    return new Date(new Date().getTime() - 1000 * 60 * minute)
}