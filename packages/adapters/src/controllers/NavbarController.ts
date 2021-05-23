import { Controller } from './Controller'
import { NavbarPresenter, NavbarPresenterVM } from '../presenters/NavbarPresenter'
import { RetrieveBookmarkCityWeatherUseCase } from '@grenoble-hands-on/domain'

export class NavbarController extends Controller<NavbarPresenterVM> {

    constructor(private retrieveBookmarkCityWeatherUseCase: RetrieveBookmarkCityWeatherUseCase, private presenter: NavbarPresenter) {
        super(presenter)
    }

    fetchBookmarkCityWeather() {
        this.retrieveBookmarkCityWeatherUseCase.execute(this.presenter)
    }
}
