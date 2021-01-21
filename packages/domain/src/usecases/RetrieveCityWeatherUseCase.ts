import {RetrieveWeatherRequest} from "../ports/request/RetrieveWeatherRequest";
import {WeatherRepository} from "../ports/repositories/WeatherRepository";
import {RetrieveWeatherPresentation} from "../ports/presenters/RetrieveWeatherPresentation";

export class RetrieveCityWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresentation) {
        presenter.displayStartLoading()
        const weekWeather = await this.weatherRepository.getWeekWeather(request.position);
        presenter.displayWeather(weekWeather)
        presenter.displayFinishLoading()
    }
}
