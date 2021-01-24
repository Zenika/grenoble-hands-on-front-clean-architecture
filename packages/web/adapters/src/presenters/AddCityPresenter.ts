import {AddCityPresentation, AddCityRequest, AddCityUseCase, City, NewCityFields} from "@grenoble-hands-on/domain";
import {Presenter} from "./Presenter";
import {Navigation} from "../router/Navigation";
import {NavigationRoute} from "../router/NavigationRoute";

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


export class AddCityPresenter extends Presenter<AddCityPresenterVM> {
    constructor(private addCityUseCase: AddCityUseCase, private navigator: Navigation) {
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
        this.addCityUseCase
            .execute(
                new AddCityRequest(this.vm.cityName || '', this.vm.latitude || '', this.vm.longitude || ''),
                this.createAddNewCityPresenter(this)
            )
            .then()
    }

    private validate() {
        this.addCityUseCase.validate(
            new AddCityRequest(this.vm.cityName || '', this.vm.latitude || '', this.vm.longitude || ''),
            this.createAddNewCityPresenter(this)
        )
    }

    private createAddNewCityPresenter(presenter: AddCityPresenter): AddCityPresentation {
        return {
            notifyNewCityInvalid(errors: Map<NewCityFields, string>) {
                presenter.vm.cityNameError = presenter.vm.cityNameTouched ? errors.get(NewCityFields.cityName) : ''
                presenter.vm.latitudeError = presenter.vm.latitudeTouched ? errors.get(NewCityFields.latitude) : ''
                presenter.vm.longitudeError = presenter.vm.longitudeTouched ? errors.get(NewCityFields.longitude) : ''
                presenter.vm.canCreateCity = errors.size == 0
            },
            notifyCityAdded(city: City) {
                presenter.navigator.navigate(NavigationRoute.CITY(city)).then()
            }
        };
    }
}
