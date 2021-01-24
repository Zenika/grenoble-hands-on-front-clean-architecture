import {CityPresenter, CityPresenterVM} from "../CityPresenter";
import {Subscriber} from "../Presenter";

export class CityPresenterBuilder {
    private fetchCityWithWeather: (city: string) => Promise<void> = () => Promise.resolve()
    private onVmUpdate: (subscriber: Subscriber<CityPresenterVM>) => void = subscriber => subscriber(this.vm)

    constructor(private vm: CityPresenterVM = new CityPresenterVM()) {
    }

    withCityWithWeather(fetchCityWithWeather: () => Promise<void>) {
        this.fetchCityWithWeather = fetchCityWithWeather
        return this;
    }

    build(): CityPresenter {
        return {
            onVmUpdate: this.onVmUpdate,
            fetchCityWithWeather: this.fetchCityWithWeather
        } as CityPresenter
    }
}
