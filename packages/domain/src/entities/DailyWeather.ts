import { UniteDegree } from './UniteDegree'
import { WeatherState } from './WeatherState'

export interface DailyWeather {
    day: string
    weather: WeatherState
    temperatureMax: number
    temperatureMin: number
    unite: UniteDegree
}
