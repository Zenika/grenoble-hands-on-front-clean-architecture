import { City, GetCitiesPresentation } from '@grenoble-hands-on/domain'
import { Presenter } from './Presenter'

export class CitiesPresenterVM {
    cities: City[] | undefined
}

export class CitiesPresenter extends Presenter<CitiesPresenterVM> implements GetCitiesPresentation  {

    constructor() {
        super(new CitiesPresenterVM())
    }

    displayCities(cities: City[]): void {
        this.vm.cities = cities
        this.notifyVM()
    }

}
