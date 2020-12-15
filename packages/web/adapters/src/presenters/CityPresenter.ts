import {City} from "../../../../domain/src/entities/City";
import {RetrieveWeatherPresenter} from "../../../../domain/src/ports/presenters/RetrieveWeatherPresenter";
import {DailyWeather} from "../../../../domain/src/entities/DailyWeather";
import {Presenter} from "./Presenter";
import {GetCityUseCase} from "../../../../domain/src/usecases/GetCityUseCase";
import {RetrieveCityWeatherUseCase} from "../../../../domain/src/usecases/RetrieveCityWeatherUseCase";
import {GetCityRequest} from "@grenoble-hands-on/domain/src/ports/request/GetCityRequest";
import {RetrieveWeatherRequest} from "../../../../domain/src/ports/request/RetrieveWeatherRequest";

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
