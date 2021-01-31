import { CityPresenter, CityPresenterVM, Subscriber } from '@grenoble-hands-on/web-adapters'

export class CityPresenterBuilder {
    private fetchCityWithWeather: (city: string, mode: 'daily' | 'hourly') => Promise<void> = () => Promise.resolve()
    private onVmUpdate: (subscriber: Subscriber<CityPresenterVM>) => void = subscriber => subscriber(this.vm)

    constructor(private vm: CityPresenterVM = new CityPresenterVM()) {
    }

    withFetchCityWithWeather(fetchCityWithWeather: (city: string, mode: 'daily' | 'hourly') => Promise<void>) {
        this.fetchCityWithWeather = fetchCityWithWeather
        return this
    }

    build(): CityPresenter {
        return {
            onVmUpdate: this.onVmUpdate,
            fetchCityWithWeather: this.fetchCityWithWeather,
        } as CityPresenter
    }
}
