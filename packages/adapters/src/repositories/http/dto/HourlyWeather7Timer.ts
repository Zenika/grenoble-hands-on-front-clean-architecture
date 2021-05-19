export interface HourlyWeather7Timer {
    init: string,
    dataseries: {
        timepoint: number
        temp2m: number
        weather: string
    }[]
}
