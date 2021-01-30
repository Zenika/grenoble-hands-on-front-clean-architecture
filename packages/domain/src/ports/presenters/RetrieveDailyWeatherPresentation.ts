import { DailyWeather } from '../../entities/DailyWeather'

export interface RetrieveDailyWeatherPresentation {
    displayWeather(weather: DailyWeather[]): void
}
