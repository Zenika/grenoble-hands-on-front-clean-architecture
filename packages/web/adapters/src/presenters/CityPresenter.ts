import {Presenter} from "./Presenter";
import {
    City,
    DailyWeather, GeoPosition, GetCityPresentation,
    GetCityRequest,
    GetCityUseCase,
    RetrieveWeatherPresentation,
    RetrieveWeatherRequest
} from "@grenoble-hands-on/domain";
import {RetrieveCityWeatherUseCase} from "@grenoble-hands-on/domain";

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
        const retrieveWeatherPresenter = this.createRetrieveWeatherPresenter(this);
        const getCityPresenter = this.createGetCityPresenter(this, this.retrieveCityWeatherUseCase, retrieveWeatherPresenter);
        await this.getCityUseCase.execute(new GetCityRequest(city), getCityPresenter)
    }

    private createGetCityPresenter(rootPresenter: CityPresenter, retrieveCityWeatherUseCase: RetrieveCityWeatherUseCase, retrieveWeatherPresenter: RetrieveWeatherPresentation): GetCityPresentation {
        return {
            displayCity(city: City) {
                rootPresenter.vm.city = city
                rootPresenter.updateVM()
                retrieveCityWeatherUseCase.execute(new RetrieveWeatherRequest(city.position), retrieveWeatherPresenter)
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
