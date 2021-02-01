import { RetrieveWeatherRequest } from '../ports/request/RetrieveWeatherRequest'
import { WeatherRepository } from '../ports/repositories/WeatherRepository'
import { RetrieveDailyWeatherPresentation } from '../ports/presenters/RetrieveDailyWeatherPresentation'
import { DailyWeather } from '../entities/DailyWeather'

export class RetrieveCityDailyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) {
        const weekWeather: DailyWeather[] = await this.weatherRepository.getCityDailyWeather(request.city).then((weather: DailyWeather[]) => {
            if (request.unite == 'F') {
                return weather.map(w => {
                    w.unite = 'F'
                    w.temperatureMin = w.temperatureMin * (9 / 5) + 32
                    w.temperatureMax = w.temperatureMax * (9 / 5) + 32
                    return w
                })
            } else {
                return weather
            }
        })
        presenter.displayWeather(weekWeather)
    }
}
