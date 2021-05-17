import { GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { CitiesPresenter } from '../presenters/CitiesPresenter'

export class CitiesController {

    constructor(private getCitiesUseCase: GetCitiesUseCase,
                public presenter: CitiesPresenter) {
    }

    fetchCities() {
        this.getCitiesUseCase.execute(this.presenter)
    }
}
