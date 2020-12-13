import {WeatherRepository} from "../ports/WeatherRepository";
import {RetrieveWeatherRequest} from "../ports/RetrieveWeatherRequest";
import {RetrieveWeatherPresenter} from "../ports/RetrieveWeatherPresenter";

export class RetrieveCityWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {

    }

    async execute(request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresenter) {
        presenter.displayStartLoading()
        const weekWeather = await this.weatherRepository.getWeekWeather(request.position);
        presenter.displayWeather(weekWeather)
        presenter.displayFinishLoading()
    }
}
