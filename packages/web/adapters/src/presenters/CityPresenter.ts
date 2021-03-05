import { Presenter } from './Presenter'
import {
    City,
    DailyWeather,
    GetCityPresentation,
    GetCityRequest,
    GetCityUseCase, HourlyWeather,
    RetrieveCityDailyWeatherUseCase, RetrieveCityHourlyWeatherUseCase,
    RetrieveDailyWeatherPresentation, RetrieveHourlyWeatherPresentation,
    RetrieveWeatherRequest
} from '@grenoble-hands-on/domain'

export class CityPresenterVM {
    city: City | undefined
    dailyWeather: DailyWeather[] | undefined
    hourlyWeather: HourlyWeather[] | undefined
    loading = false
    temperatureUnite: 'C' | 'F' = 'C'
    mode: 'hourly' | 'daily' = 'daily'
}


export class CityPresenter extends Presenter<CityPresenterVM> {

    constructor(private cityId: string,
                private getCityUseCase: GetCityUseCase,
                private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,
                private retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase) {
        super(new CityPresenterVM())
    }

    async fetchCity() {
        await this.getCityUseCase.execute(new GetCityRequest(this.cityId), this.createGetCityPresenter(this))
    }

    async fetchWeather() {
        this.vm.loading = true
        this.vm.hourlyWeather = undefined
        this.vm.dailyWeather = undefined
        this.updateVM()
        if (this.vm.mode == 'daily') {
            await this.retrieveCityWeatherUseCase.execute(new RetrieveWeatherRequest(this.cityId, this.vm.temperatureUnite), this.createRetrieveDailyWeatherPresenter(this))
        } else {
            await this.retrieveCityHourlyWeatherUseCase.execute(new RetrieveWeatherRequest(this.cityId, this.vm.temperatureUnite), this.createRetrieveHourlyWeatherPresenter(this))
        }
    }

    updateTemperatureUnite(temperatureUnite: 'C' | 'F') {
        this.vm.temperatureUnite = temperatureUnite;
        this.fetchWeather()
    }

    updateMode(mode: 'hourly' | 'daily') {
        this.vm.mode = mode;
        this.fetchWeather()
    }

    private createGetCityPresenter(rootPresenter: CityPresenter): GetCityPresentation {
        return {
            displayCity(city: City) {
                rootPresenter.vm.city = city
                rootPresenter.updateVM()
            }
        }
    }

    private createRetrieveDailyWeatherPresenter(rootPresenter: CityPresenter): RetrieveDailyWeatherPresentation {
        return {
            displayWeather(weather: DailyWeather[]) {
                rootPresenter.vm.dailyWeather = weather
                rootPresenter.vm.loading = false
                rootPresenter.updateVM()
            }
        }
    }

    private createRetrieveHourlyWeatherPresenter(rootPresenter: CityPresenter): RetrieveHourlyWeatherPresentation {
        return {
            displayWeather(weather: HourlyWeather[]) {
                rootPresenter.vm.hourlyWeather = weather
                rootPresenter.vm.loading = false
                rootPresenter.updateVM()
            }
        }
    }
}
