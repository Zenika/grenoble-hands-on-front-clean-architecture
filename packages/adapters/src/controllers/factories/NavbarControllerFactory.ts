import { NavbarController } from '../NavbarController'
import { NavbarPresenter } from '../../presenters/NavbarPresenter'
import { RetrieveBookmarkCityWeatherUseCase } from '@grenoble-hands-on/domain'

export class NavbarControllerFactory {

    constructor(private retrieveBookmarkCityWeatherUseCase: RetrieveBookmarkCityWeatherUseCase) {
    }


    build(): NavbarController {
        return new NavbarController(this.retrieveBookmarkCityWeatherUseCase, new NavbarPresenter())
    }
}
