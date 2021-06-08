import { BookmarkCityUseCase, GetBookmarkCityUseCase, GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { CitiesController } from '../CitiesController'
import { CitiesPresenter } from '../../presenters/CitiesPresenter'

export class CitiesControllerFactory {
    constructor(private getCitiesUseCase: GetCitiesUseCase,
                private bookmarkCityUseCase: BookmarkCityUseCase,
                private getBookmarkCityUseCase: GetBookmarkCityUseCase) {
    }

    build(): CitiesController {
        return new CitiesController(this.getCitiesUseCase, this.bookmarkCityUseCase, this.getBookmarkCityUseCase, new CitiesPresenter())
    }
}
