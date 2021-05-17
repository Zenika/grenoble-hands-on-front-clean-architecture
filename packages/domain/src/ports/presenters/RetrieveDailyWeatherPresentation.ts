import { DailyWeather } from '../../entities/DailyWeather'

export interface RetrieveDailyWeatherPresentation {
    displayDailyWeather(weather: DailyWeather[]): void
}
