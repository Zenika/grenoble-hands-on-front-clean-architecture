import { DailyWeather } from '../../entities/DailyWeather'

export interface RetrieveDailyWeatherPresentation {
    displayLoadingWeather(): void
    displayDailyWeather(weather: DailyWeather[]): void
}
