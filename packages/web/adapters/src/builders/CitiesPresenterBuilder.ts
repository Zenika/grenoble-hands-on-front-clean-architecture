import { Subscriber } from '../presenters/Presenter'
import { CitiesPresenter, CitiesPresenterVM } from '../presenters/CitiesPresenter'

export class CitiesPresenterBuilder {
    private fetchCities: () => Promise<void> = () => Promise.resolve()
    private onVmUpdate: (subscriber: Subscriber<CitiesPresenterVM>) => void = subscriber => subscriber(this.vm)

    constructor(private vm: CitiesPresenterVM = new CitiesPresenterVM()) {
    }

    withFetchCities(fetchCities: () => Promise<void>) {
        this.fetchCities = fetchCities
        return this
    }

    build(): CitiesPresenter {
        return {
            vm: this.vm,
            onVmUpdate: this.onVmUpdate,
            fetchCities: this.fetchCities
        } as CitiesPresenter
    }
}
