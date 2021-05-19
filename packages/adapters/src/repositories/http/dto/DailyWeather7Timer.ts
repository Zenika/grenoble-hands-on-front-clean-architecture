export interface DailyWeather7Timer {
    dataseries: {
        date: string
        temp2m: { max: number, min: number }
        weather: string
        wind10m_max: number
    }[]
}
