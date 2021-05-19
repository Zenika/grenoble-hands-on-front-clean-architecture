import { AddCityRequest, AddCityUseCase } from '@grenoble-hands-on/domain'
import { AddCityPresenter, AddCityPresenterVM } from '../presenters/AddCityPresenter'
import { Controller } from './Controller'

export class AddCityController extends Controller<AddCityPresenterVM> {
    constructor(private addCityUseCase: AddCityUseCase,
                private presenter: AddCityPresenter) {
        super(presenter)
    }

    validateCityName(cityName: string) {
        this.presenter.vm.cityName = cityName
        this.presenter.vm.cityNameTouched = true
        this.validate()
    }

    validateLongitude(longitude: string) {
        this.presenter.vm.longitude = longitude
        this.presenter.vm.longitudeTouched = true
        this.validate()
    }

    validateLatitude(latitude: string) {
        this.presenter.vm.latitude = latitude
        this.presenter.vm.latitudeTouched = true
        this.validate()
    }

    create() {
        this.addCityUseCase
            .execute(
                new AddCityRequest(this.presenter.vm.cityName || '', this.presenter.vm.latitude || '', this.presenter.vm.longitude || ''),
                this.presenter
            )
    }

    private validate() {
        this.addCityUseCase.validate(
            new AddCityRequest(this.presenter.vm.cityName || '', this.presenter.vm.latitude || '', this.presenter.vm.longitude || ''),
            this.presenter
        )
    }
}
