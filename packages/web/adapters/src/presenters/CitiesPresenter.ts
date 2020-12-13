import {GetCitiesPresenter} from "../../../../domain/src/ports/presenters/GetCitiesPresenter";
import {GetCitiesUseCase} from "../../../../domain/src/usecases/GetCitiesUseCase";
import {City} from "../../../../domain/src/entities/City";

export class CitiesPresenterVM {
    cities: City[] | undefined
}

type Subscriber<T> = (vm: T) => void;

export class CitiesPresenter implements GetCitiesPresenter {

    public vm: CitiesPresenterVM = new CitiesPresenterVM()
    private subscriber: Subscriber<CitiesPresenterVM> | undefined

    constructor(private getCitiesUseCase: GetCitiesUseCase) {
    }

    async fetchCities() {
        await this.getCitiesUseCase.execute(this)
    }

    displayCities(cities: City[]): void {
        this.vm.cities = cities
        this.notifyVmUpdate()
    }

    notifyVmUpdate() {
        this.subscriber?.call(this.subscriber, this.vm)
    }

    subscribeVmUpdate(subscriber: Subscriber<CitiesPresenterVM>) {
        this.subscriber = subscriber
    }
}
