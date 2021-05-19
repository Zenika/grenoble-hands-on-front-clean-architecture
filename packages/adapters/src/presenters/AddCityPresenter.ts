import { AddCityErrors, AddCityPresentation, City, NewCityFields } from '@grenoble-hands-on/domain'
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


export class AddCityPresenter extends Presenter<AddCityPresenterVM> implements AddCityPresentation{
    constructor(private navigator: Navigation) {
        super(new AddCityPresenterVM())
    }

    notifyCityAdded(city: City): void {
        this.navigator.navigate(NavigationRoute.CITY(city))
    }

    notifyNewCityInvalid(errors: AddCityErrors): void {
        this.vm.cityNameError = this.vm.cityNameTouched ? errors.get(NewCityFields.cityName) : ''
        this.vm.latitudeError = this.vm.latitudeTouched ? errors.get(NewCityFields.latitude) : ''
        this.vm.longitudeError = this.vm.longitudeTouched ? errors.get(NewCityFields.longitude) : ''
        this.vm.canCreateCity = errors.size == 0
        this.notifyVM()
    }
}
