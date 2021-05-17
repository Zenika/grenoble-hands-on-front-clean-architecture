import {
    GetCityRequest,
    GetCityUseCase,
    RetrieveCityDailyWeatherUseCase,
    RetrieveCityHourlyWeatherUseCase,
    RetrieveWeatherRequest
} from '@grenoble-hands-on/domain'
import { CityPresenter } from '../presenters/CityPresenter'

export class CityController {

    constructor(private cityId: string,
                private getCityUseCase: GetCityUseCase,
                private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,
                private retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase,
                public presenter: CityPresenter) {
    }

    fetchCity() {
        this.getCityUseCase.execute(new GetCityRequest(this.cityId), this.presenter)
    }

    fetchWeather() {
        this.presenter.vm.loading = true
        this.presenter.vm.hourlyWeather = undefined
        this.presenter.vm.dailyWeather = undefined

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
