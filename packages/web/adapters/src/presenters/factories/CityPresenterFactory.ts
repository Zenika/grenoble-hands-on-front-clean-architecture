import { GetCityUseCase, RetrieveCityDailyWeatherUseCase, RetrieveCityHourlyWeatherUseCase } from '@grenoble-hands-on/domain'
import { CityPresenter } from '../CityPresenter'

export class CityPresenterFactory {

    constructor(private getCityUseCase: GetCityUseCase, private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,  private retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase) {
    }

    build(cityId: string): CityPresenter {
        return new CityPresenter(cityId, this.getCityUseCase, this.retrieveCityWeatherUseCase, this.retrieveCityHourlyWeatherUseCase)
    }
}
