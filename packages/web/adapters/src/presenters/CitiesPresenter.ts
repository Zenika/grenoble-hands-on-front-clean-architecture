import { City, GetCitiesPresentationBuilder, GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { Presenter } from './Presenter'

export class CitiesPresenterVM {
    cities: City[] | undefined
}

export class CitiesPresenter extends Presenter<CitiesPresenterVM> {

    constructor(private getCitiesUseCase: GetCitiesUseCase) {
        super(new CitiesPresenterVM())
    }

    async fetchCities() {
        await this.getCitiesUseCase.execute(new GetCitiesPresentationBuilder()
            .withDisplayCities((cities: City[]) => {
                this.vm.cities = cities
                this.updateVM()
            })
            .build()
        )
    }
}
