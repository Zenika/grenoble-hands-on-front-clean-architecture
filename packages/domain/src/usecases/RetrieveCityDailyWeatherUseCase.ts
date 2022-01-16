import { RetrieveWeatherRequest } from '../ports/request/RetrieveWeatherRequest'
import { WeatherRepository } from '../ports/repositories/WeatherRepository'
import { RetrieveDailyWeatherPresentation } from '../ports/presenters/RetrieveDailyWeatherPresentation'
import { DailyWeather } from '../entities/DailyWeather'

export class RetrieveCityDailyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) {
        presenter.displayLoadingWeather()
        const weekWeather: DailyWeather[] = await this.weatherRepository.getCityDailyWeather(request.city).then((weather: DailyWeather[]) => {
            if (request.unite == 'F') {
                return weather.map(w => {
                    w.unite = 'F'
                    w.temperatureMin = this.convertToFahrenheit(w.temperatureMin)
                    w.temperatureMax = this.convertToFahrenheit(w.temperatureMax)
                    return w
                })
            } else {
                return weather
            }
        })
        presenter.displayDailyWeather(weekWeather)
    }

    private convertToFahrenheit(temperature: number) {
        return temperature * (9 / 5) + 32
    }
}
