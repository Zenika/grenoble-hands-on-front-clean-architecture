import { DailyWeather } from '../../entities/DailyWeather'

export interface RetrieveWeatherPresentation {
    displayWeather(weather: DailyWeather[]): void
    displayStartLoading(): void
    displayFinishLoading(): void
}
