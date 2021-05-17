import { RetrieveWeatherRequest } from '../ports/request/RetrieveWeatherRequest'
import { WeatherRepository } from '../ports/repositories/WeatherRepository'
import { HourlyWeather, RetrieveHourlyWeatherPresentation } from '@grenoble-hands-on/domain'

export class RetrieveCityHourlyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveHourlyWeatherPresentation) {
        const weekWeather = await this.weatherRepository.getCityHourlyWeather(request.city).then((weather: HourlyWeather[]) => {
            if (request.unite == 'F') {
                return weather.map(w => {
                    w.unite = 'F'
                    w.temperature = Math.round(w.temperature * (9 / 5) + 32)
                    return w
                })
            } else {
                return weather
            }
        });
        presenter.displayHourlyWeather(weekWeather)
    }
}
