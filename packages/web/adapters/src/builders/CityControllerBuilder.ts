import { CityPresenterVM } from '../presenters/CityPresenter'
import { Subscriber } from '../presenters/Presenter'
import { CityController } from '../controllers/CityController'

export class CityControllerBuilder {
    private fetchWeather: () => void = () => {}
    private fetchCity: () => void = () => {}
    private updateMode: (mode: 'hourly' | 'daily') => void = () => null
    private updateTemperatureUnit: (temperatureUnit: 'C' | 'F') => void = () => null
    private onVmUpdate: (subscriber: Subscriber<CityPresenterVM>) => void = subscriber => subscriber(this.vm)

    constructor(private vm: CityPresenterVM = new CityPresenterVM()) {
    }

    withFetchWeather(fetchWeather: () => Promise<void>) {
        this.fetchWeather = fetchWeather
        return this
    }

    withFetchCity(fetchCity: () => Promise<void>) {
        this.fetchCity = fetchCity
        return this
    }

    withUpdateMode(updateMode: (mode: 'hourly' | 'daily') => void) {
        this.updateMode = updateMode
        return this
    }

    withUpdateTemperatureUnit(updateTemperatureUnit: (temperatureUnit: 'C' | 'F') => void) {
        this.updateTemperatureUnit = updateTemperatureUnit
        return this
    }

    build(): CityController {
        return {
            presenter: {
                vm: this.vm,
                subscribeVM: this.onVmUpdate,
            },
            fetchWeather: this.fetchWeather,
            fetchCity: this.fetchCity,
            updateMode: this.updateMode,
            updateTemperatureUnite: this.updateTemperatureUnit,
        } as CityController
    }
}
