import { Subscriber } from '../../src/presenters/Presenter'
import { CityPresenterVM } from '../../src/presenters/CityPresenter'
import { CityController } from '../../src/controllers/CityController'

export class CityControllerBuilder {
    private fetchWeather: () => void = () => {
    }
    private updateMode: (mode: 'hourly' | 'daily') => void = () => null
    private updateTemperatureUnit: (temperatureUnit: 'C' | 'F') => void = () => null
    private onVmUpdate: (subscriber: Subscriber<CityPresenterVM>) => void = subscriber => subscriber(this.vm)

    constructor(private vm: CityPresenterVM = new CityPresenterVM()) {
    }

    withFetchWeather(fetchWeather: () => Promise<void>) {
        this.fetchWeather = fetchWeather
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
            vm: this.vm,
            subscribeVM: this.onVmUpdate,
            fetchWeather: this.fetchWeather,
            updateMode: this.updateMode,
            updateTemperatureUnite: this.updateTemperatureUnit,
        } as CityController
    }
}
