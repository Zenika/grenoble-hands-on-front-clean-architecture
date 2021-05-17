import { GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { CitiesController } from '../CitiesController'
import { CitiesPresenter } from '../../presenters/CitiesPresenter'

export class CitiesControllerFactory {
    constructor(private getCitiesUseCase: GetCitiesUseCase) {
    }

    build(): CitiesController {
        return new CitiesController(this.getCitiesUseCase, new CitiesPresenter())
    }
}
