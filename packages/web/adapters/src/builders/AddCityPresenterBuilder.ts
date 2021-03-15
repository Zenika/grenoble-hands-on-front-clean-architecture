import { Subscriber } from '../presenters/Presenter'
import { AddCityPresenter, AddCityPresenterVM } from '../presenters/AddCityPresenter'

export class AddCityPresenterBuilder {
    private onVmUpdate: (subscriber: Subscriber<AddCityPresenterVM>) => void = subscriber => subscriber(this.vm)
    private validateCityName: (cityName: string) => void = () => null
    private validateLatitude: (latitude: string) => void = () => null
    private validateLongitude: (longitude: string) => void = () => null
    private create: () => void = () => null

    constructor(private vm: AddCityPresenterVM = new AddCityPresenterVM()) {
    }

    withValidateCityName(validateCityName: (cityName: string) => Promise<void>) {
        this.validateCityName = validateCityName
        return this
    }

    withValidateLatitude(validateLatitude: (latitude: string) => Promise<void>) {
        this.validateLatitude = validateLatitude
        return this
    }

    withValidateLongitude(validateLongitude: (longitude: string) => Promise<void>) {
        this.validateLongitude = validateLongitude
        return this
    }

    withCreate(create: () => Promise<void>) {
        this.create = create
        return this
    }

    build(): AddCityPresenter {
        return {
            vm: this.vm,
            onVmUpdate: this.onVmUpdate,
            validateCityName: this.validateCityName,
            validateLatitude: this.validateLatitude,
            validateLongitude: this.validateLongitude,
            create: this.create,
        } as AddCityPresenter
    }
}
