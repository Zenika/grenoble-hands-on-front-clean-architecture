import { HourlyWeather } from '../../entities/HourlyWeather'

export interface RetrieveHourlyWeatherPresentation {
    displayLoadingWeather(): void
    displayHourlyWeather(weather: HourlyWeather[]): void
}
