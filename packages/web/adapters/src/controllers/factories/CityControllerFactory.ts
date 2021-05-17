import { GetCityUseCase, RetrieveCityDailyWeatherUseCase, RetrieveCityHourlyWeatherUseCase } from '@grenoble-hands-on/domain'
import { CityPresenter } from '../../presenters/CityPresenter'
import { CityController } from '../CityController'

export class CityControllerFactory {

    constructor(private getCityUseCase: GetCityUseCase, private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase, private retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase) {
    }

    build(cityId: string): CityController {
        return new CityController(cityId, this.getCityUseCase, this.retrieveCityWeatherUseCase, this.retrieveCityHourlyWeatherUseCase, new CityPresenter())
    }
}
