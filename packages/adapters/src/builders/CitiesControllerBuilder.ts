import { CitiesController, CitiesPresenterVM, Subscriber } from '@grenoble-hands-on/web-adapters'

export class CitiesControllerBuilder {
    private fetchCities: () => void = () => {}
    private bookmarkCity: (city: string) => void = () => {}
    private onVmUpdate: (subscriber: Subscriber<CitiesPresenterVM>) => void = subscriber => subscriber(this.vm)

    constructor(private vm: CitiesPresenterVM = new CitiesPresenterVM()) {
    }

    withFetchCities(fetchCities: () => void) {
        this.fetchCities = fetchCities
        return this
    }

    withBookmarkCity(bookmarkCity: (city: string) => void) {
        this.bookmarkCity = bookmarkCity
        return this
    }

    build(): CitiesController {
        return {
            vm: this.vm,
            subscribeVM: this.onVmUpdate,
            fetchCities: this.fetchCities,
            bookmarkCity: this.bookmarkCity
        } as CitiesController
    }
}
