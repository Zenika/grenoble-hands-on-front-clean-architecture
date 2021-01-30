import { RetrieveWeatherRequest } from '../ports/request/RetrieveWeatherRequest'
import { WeatherRepository } from '../ports/repositories/WeatherRepository'
import { RetrieveDailyWeatherPresentation } from '../ports/presenters/RetrieveDailyWeatherPresentation'
import { RetrieveHourlyWeatherPresentation } from '@grenoble-hands-on/domain'

export class RetrieveCityHourlyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveHourlyWeatherPresentation) {
        const weekWeather = await this.weatherRepository.getCityHourlyWeather(request.city);
        presenter.displayWeather(weekWeather)
    }
}
