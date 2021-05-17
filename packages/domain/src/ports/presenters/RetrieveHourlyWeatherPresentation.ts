import { HourlyWeather } from '../../entities/HourlyWeather'

export interface RetrieveHourlyWeatherPresentation {
    displayHourlyWeather(weather: HourlyWeather[]): void
}
