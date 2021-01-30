import { DailyWeather } from '../../entities/DailyWeather'
import { HourlyWeather } from '../../entities/HourlyWeather'

export interface WeatherRepository {
    getCityDailyWeather(city: string): Promise<DailyWeather[]>
    getCityHourlyWeather(city: string): Promise<HourlyWeather[]>
}
