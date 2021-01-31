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
}


export class CityPresenter extends Presenter<CityPresenterVM> {

    constructor(private getCityUseCase: GetCityUseCase,
                private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,
                private retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase) {
        super(new CityPresenterVM())
    }

    async fetchCityWithWeather(city: string, mode: 'hourly' | 'daily' = 'daily') {
        this.vm.loading = true
        this.vm.hourlyWeather = undefined
        this.vm.dailyWeather = undefined
        this.updateVM()
        await this.getCityUseCase.execute(new GetCityRequest(city), this.createGetCityPresenter(this))
        if (mode == 'daily') {
            await this.retrieveCityWeatherUseCase.execute(new RetrieveWeatherRequest(city), this.createRetrieveDailyWeatherPresenter(this))
        } else {
            await this.retrieveCityHourlyWeatherUseCase.execute(new RetrieveWeatherRequest(city), this.createRetrieveHourlyWeatherPresenter(this))
        }
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
