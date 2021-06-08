import { BookmarkCityRequest, BookmarkCityUseCase, GetBookmarkCityUseCase, GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { CitiesPresenter, CitiesPresenterVM } from '../presenters/CitiesPresenter'
import { Controller } from './Controller'

export class CitiesController extends Controller<CitiesPresenterVM> {

    constructor(private readonly getCitiesUseCase: GetCitiesUseCase,
                private readonly bookmarkCityUseCase: BookmarkCityUseCase,
                private readonly getBookmarkCityUseCase: GetBookmarkCityUseCase,
                private readonly presenter: CitiesPresenter) {
        super(presenter)
    }

    fetchCities() {
        this.getCitiesUseCase.execute(this.presenter)
        this.getBookmarkCityUseCase.execute(this.presenter)
    }

    bookmarkCity(cityId: string) {
        console.log("bookmark :"+cityId)
        this.bookmarkCityUseCase.execute(new BookmarkCityRequest(cityId), this.presenter)
    }
}
