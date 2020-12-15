import {Presenter} from "./Presenter";
import {
    City,
    DailyWeather,
    GetCityRequest,
    GetCityUseCase,
    RetrieveWeatherPresenter,
    RetrieveWeatherRequest
} from "@grenoble-hands-on/domain";
import {RetrieveCityWeatherUseCase} from "@grenoble-hands-on/domain/dist/usecases/RetrieveCityWeatherUseCase";

export class CityPresenterVM {
    city: City | undefined
    weather: DailyWeather[] | undefined = undefined
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

    private createGetCityPresenter(rootPresenter: CityPresenter, retrieveCityWeatherUseCase: RetrieveCityWeatherUseCase, retrieveWeatherPresenter: RetrieveWeatherPresenter) {
        return {
            displayCity(city: City) {
                rootPresenter.vm.city = city
                rootPresenter.updateVM()
                retrieveCityWeatherUseCase.execute(new RetrieveWeatherRequest(city.position), retrieveWeatherPresenter)
            }
        };
    }

    private createRetrieveWeatherPresenter(rootPresenter: CityPresenter) {
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
