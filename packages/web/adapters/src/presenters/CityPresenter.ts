import {Presenter} from "./Presenter";
import {
    City,
    DailyWeather,
    GetCityPresentation,
    GetCityRequest,
    GetCityUseCase,
    RetrieveCityWeatherUseCase,
    RetrieveWeatherPresentation,
    RetrieveWeatherRequest
} from "@grenoble-hands-on/domain";

export class CityPresenterVM {
    city: City | undefined
    weather: DailyWeather[] | undefined
    loading = false
}


export class CityPresenter extends Presenter<CityPresenterVM> {

    constructor(private getCityUseCase: GetCityUseCase, private retrieveCityWeatherUseCase: RetrieveCityWeatherUseCase) {
        super(new CityPresenterVM());
    }

    async fetchCityWithWeather(city: string) {
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

    private createRetrieveWeatherPresenter(rootPresenter: CityPresenter): RetrieveWeatherPresentation {
        return {
            displayWeather(weather: DailyWeather[]) {
                rootPresenter.vm.weather = weather
                rootPresenter.updateVM()
            },
            displayStartLoading() {
                rootPresenter.vm.loading = true
                rootPresenter.updateVM()
            },
            displayFinishLoading() {
                rootPresenter.vm.loading = false
                rootPresenter.updateVM()
            }
        };
    }
}
