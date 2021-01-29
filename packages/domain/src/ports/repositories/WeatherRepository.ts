import { DailyWeather } from '../../entities/DailyWeather'

export interface WeatherRepository {
    getCityWeekWeather(city: string): Promise<DailyWeather[]>
}
