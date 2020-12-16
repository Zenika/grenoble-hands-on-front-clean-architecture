import {GetCityUseCase, RetrieveCityWeatherUseCase} from "@grenoble-hands-on/domain";
import {CityPresenter} from "./CityPresenter";

export class CityPresenterFactory {

    constructor(private getCityUseCase: GetCityUseCase, private retrieveCityWeatherUseCase: RetrieveCityWeatherUseCase) {
    }

    createCityPresenter(): CityPresenter {
        return new CityPresenter(this.getCityUseCase, this.retrieveCityWeatherUseCase)
    }
}
