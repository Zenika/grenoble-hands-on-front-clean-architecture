import {
    AddCityPresentation,
    AddCityPresentationBuilder,
    AddCityRequest,
    AddCityUseCase,
    City,
    NewCityFields
} from '@grenoble-hands-on/domain'
import { Presenter } from './Presenter'
import { Navigation } from '../router/Navigation'
import { NavigationRoute } from '../router/NavigationRoute'

export class AddCityPresenterVM {
    cityNameError: string | undefined
    latitudeError: string | undefined
    longitudeError: string | undefined
    cityNameTouched = false
    latitudeTouched = false
    longitudeTouched = false
    cityName: string | undefined
    latitude: string | undefined
    longitude: string | undefined
    canCreateCity = false
}


export class AddCityPresenter extends Presenter<AddCityPresenterVM> {
    constructor(private addCityUseCase: AddCityUseCase, private navigator: Navigation) {
        super(new AddCityPresenterVM())
    }

    validateCityName(cityName: string) {
        this.vm.cityName = cityName
        this.vm.cityNameTouched = true
        this.validate()
    }

    validateLongitude(longitude: string) {
        this.vm.longitude = longitude
        this.vm.longitudeTouched = true
        this.validate()
    }

    validateLatitude(latitude: string) {
        this.vm.latitude = latitude
        this.vm.latitudeTouched = true
        this.validate()
    }

    create() {
        this.addCityUseCase
            .execute(
                new AddCityRequest(this.vm.cityName || '', this.vm.latitude || '', this.vm.longitude || ''),
                this.createAddNewCityPresenter()
            )
            .then()
    }

    private validate() {
        this.addCityUseCase.validate(
            new AddCityRequest(this.vm.cityName || '', this.vm.latitude || '', this.vm.longitude || ''),
            this.createAddNewCityPresenter()
        )
    }

    private createAddNewCityPresenter(): AddCityPresentation {
        return new AddCityPresentationBuilder()
            .withNotifyNewCityInvalid((errors: Map<NewCityFields, string>) => {
                this.vm.cityNameError = this.vm.cityNameTouched ? errors.get(NewCityFields.cityName) : ''
                this.vm.latitudeError = this.vm.latitudeTouched ? errors.get(NewCityFields.latitude) : ''
                this.vm.longitudeError = this.vm.longitudeTouched ? errors.get(NewCityFields.longitude) : ''
                this.vm.canCreateCity = errors.size == 0
            })
            .withNotifyCityAdded((city: City) => {
                this.navigator.navigate(NavigationRoute.CITY(city)).then()
            })
            .build()
    }
}
