import {AddCityRequest, AddNewCityUseCase, NewCityFields} from "@grenoble-hands-on/domain";
import {Presenter} from "./Presenter";

export class AddCityPresenterVM {
    cityNameError: string | undefined;
    latitudeError: string | undefined;
    longitudeError: string | undefined;
    cityNameTouched = false;
    latitudeTouched = false;
    longitudeTouched = false;
    cityName: string | undefined;
    latitude: string | undefined;
    longitude: string | undefined;
    canCreateCity = false;
}


export class AddCityPresenter extends Presenter<AddCityPresenterVM>{
    constructor(private addNewCityUseCase: AddNewCityUseCase) {
        super(new AddCityPresenterVM())
    }

    validateCityName(cityName: string) {
        this.vm.cityName = cityName
        this.vm.cityNameTouched = true
        this.validate();
    }

    validateLongitude(longitude: string) {
        this.vm.longitude = longitude
        this.vm.longitudeTouched = true
        this.validate();
    }

    validateLatitude(latitude: string) {
        this.vm.latitude = latitude
        this.vm.latitudeTouched = true
        this.validate();
    }

    create() {
        this.addNewCityUseCase.execute(new AddCityRequest(this.vm.cityName || '', this.vm.latitude || '', this.vm.longitude || ''), this.createAddNewCityPresenter(this))
    }

    private validate() {
        this.addNewCityUseCase.validate(new AddCityRequest(this.vm.cityName || '', this.vm.latitude || '', this.vm.longitude || ''), this.createAddNewCityPresenter(this))
    }

    private createAddNewCityPresenter(presenter: AddCityPresenter) {
        return {
            notifyNewCityInvalid(errors: Map<NewCityFields, string>) {
                presenter.vm.cityNameError = presenter.vm.cityNameTouched ? errors.get(NewCityFields.cityName) : ''
                presenter.vm.latitudeError = presenter.vm.latitudeTouched ? errors.get(NewCityFields.latitude) : ''
                presenter.vm.longitudeError = presenter.vm.longitudeTouched ? errors.get(NewCityFields.longitude) : ''
                presenter.vm.canCreateCity = errors.size == 0
            }
        };
    }
}
