import { GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { CitiesPresenter, CitiesPresenterVM } from '../presenters/CitiesPresenter'
import { Controller } from './Controller'

export class CitiesController extends Controller<CitiesPresenterVM> {

    constructor(private getCitiesUseCase: GetCitiesUseCase,
                private presenter: CitiesPresenter) {
        super(presenter)
    }

    fetchCities() {
        this.getCitiesUseCase.execute(this.presenter)
    }
}
