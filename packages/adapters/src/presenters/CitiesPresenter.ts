import { BookmarkCityPresentation, City, GetBookmarkCityPresentation, GetCitiesPresentation } from '@grenoble-hands-on/domain'
import { Presenter } from './Presenter'

export class CitiesPresenterVM {
    cities: City[] | undefined
    favoriteCityId: string | null = null
}

export class CitiesPresenter extends Presenter<CitiesPresenterVM> implements GetCitiesPresentation, BookmarkCityPresentation, GetBookmarkCityPresentation  {

    constructor() {
        super(new CitiesPresenterVM())
    }

    displayCities(cities: City[]): void {
        this.vm.cities = cities
        this.notifyVM()
    }

    notifyCityBookmarked(city: string): void {
        this.vm.favoriteCityId = city
        this.notifyVM()
    }

    notifyCityRemovedFromBookmark(): void {
        this.vm.favoriteCityId = null
        this.notifyVM()
    }

}
