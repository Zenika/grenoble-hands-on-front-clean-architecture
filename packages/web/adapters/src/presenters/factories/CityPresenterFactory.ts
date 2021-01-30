import { GetCityUseCase, RetrieveCityDailyWeatherUseCase } from '@grenoble-hands-on/domain'
import { CityPresenter } from '../CityPresenter'

export class CityPresenterFactory {

    constructor(private getCityUseCase: GetCityUseCase, private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase) {
    }

    build(): CityPresenter {
        return new CityPresenter(this.getCityUseCase, this.retrieveCityWeatherUseCase)
    }
}
