import {
    GetCityRequest,
    RetrieveCityDailyWeatherUseCase,
    RetrieveCityHourlyWeatherUseCase,
    RetrieveWeatherRequest
} from '@grenoble-hands-on/domain'
import { CityPresenter, CityPresenterVM } from '../presenters/CityPresenter'
import { Controller } from './Controller'

export class CityController extends Controller<CityPresenterVM> {

    constructor(private cityId: string,
                private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,
                private retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase,
                private presenter: CityPresenter) {
        super(presenter)
    }


    fetchWeather() {
        if (this.presenter.vm.mode == 'daily') {
            this.retrieveCityWeatherUseCase.execute(
                new RetrieveWeatherRequest(this.cityId, this.presenter.vm.temperatureUnite),
                this.presenter
            )
        } else {
            this.retrieveCityHourlyWeatherUseCase.execute(
                new RetrieveWeatherRequest(this.cityId, this.presenter.vm.temperatureUnite),
                this.presenter
            )
        }
    }

    updateTemperatureUnite(temperatureUnite: 'C' | 'F') {
        this.presenter.vm.temperatureUnite = temperatureUnite
        this.fetchWeather()
    }

    updateMode(mode: 'hourly' | 'daily') {
        this.presenter.vm.mode = mode
        this.fetchWeather()
    }
}
