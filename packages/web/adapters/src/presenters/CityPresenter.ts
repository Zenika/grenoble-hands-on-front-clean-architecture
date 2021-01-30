import { Presenter } from './Presenter'
import {
    City,
    DailyWeather,
    GetCityPresentation,
    GetCityRequest,
    GetCityUseCase,
    RetrieveCityDailyWeatherUseCase,
    RetrieveDailyWeatherPresentation,
    RetrieveWeatherRequest
} from '@grenoble-hands-on/domain'

export class CityPresenterVM {
    city: City | undefined
    weather: DailyWeather[] | undefined
    loading = false
}


export class CityPresenter extends Presenter<CityPresenterVM> {

    constructor(private getCityUseCase: GetCityUseCase, private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase) {
        super(new CityPresenterVM());
    }

    async fetchCityWithWeather(city: string) {
        this.vm.loading = true
        this.updateVM()
        await this.getCityUseCase.execute(new GetCityRequest(city), this.createGetCityPresenter(this))
        await this.retrieveCityWeatherUseCase.execute(new RetrieveWeatherRequest(city), this.createRetrieveWeatherPresenter(this))
    }

    private createGetCityPresenter(rootPresenter: CityPresenter): GetCityPresentation {
        return {
            displayCity(city: City) {
                rootPresenter.vm.city = city
                rootPresenter.updateVM()
            }
        };
    }

    private createRetrieveWeatherPresenter(rootPresenter: CityPresenter): RetrieveDailyWeatherPresentation {
        return {
            displayWeather(weather: DailyWeather[]) {
                rootPresenter.vm.weather = weather
                rootPresenter.vm.loading = false
                rootPresenter.updateVM()
            }
        };
    }
}
