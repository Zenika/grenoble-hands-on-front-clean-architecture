import { RetrieveWeatherRequest } from '../ports/request/RetrieveWeatherRequest'
import { WeatherRepository } from '../ports/repositories/WeatherRepository'
import { RetrieveDailyWeatherPresentation } from '../ports/presenters/RetrieveDailyWeatherPresentation'

export class RetrieveCityDailyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) {
        const weekWeather = await this.weatherRepository.getCityDailyWeather(request.city);
        presenter.displayWeather(weekWeather)
    }
}
