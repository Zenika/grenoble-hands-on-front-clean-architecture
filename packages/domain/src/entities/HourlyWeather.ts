import { UniteDegree } from './UniteDegree'
import { WeatherState } from './WeatherState'

export interface HourlyWeather {
    time: string;
    temperature: number;
    weather: WeatherState,
    unite: UniteDegree
}
