import { HourlyWeather } from '../../entities/HourlyWeather'

export interface RetrieveHourlyWeatherPresentation {
    displayWeather(weather: HourlyWeather[]): void
}
