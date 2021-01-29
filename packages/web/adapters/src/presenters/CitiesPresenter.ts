import { City, GetCitiesPresentation, GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { Presenter } from './Presenter'

export class CitiesPresenterVM {
    cities: City[] | undefined
}

export class CitiesPresenter extends Presenter<CitiesPresenterVM> {

    constructor(private getCitiesUseCase: GetCitiesUseCase) {
        super(new CitiesPresenterVM())
    }

    async fetchCities() {
        await this.getCitiesUseCase.execute(this.createGetCitiesPresenter(this))
    }

    private createGetCitiesPresenter(pagePresenter:  CitiesPresenter): GetCitiesPresentation {
        return {
            displayCities(cities: City[]) {
                pagePresenter.vm.cities = cities
                pagePresenter.updateVM()
            }
        };
    }
}
