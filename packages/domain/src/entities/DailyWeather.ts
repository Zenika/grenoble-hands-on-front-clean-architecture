import { UniteDegree } from './UniteDegree'

export interface DailyWeather {
    day: string
    weather: string
    temperatureMax: number
    temperatureMin: number
    unite: UniteDegree
}
