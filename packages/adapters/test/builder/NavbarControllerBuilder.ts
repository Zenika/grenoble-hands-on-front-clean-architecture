import { Subscriber } from '../../src/presenters/Presenter'
import { NavbarPresenterVM } from '../../src/presenters/NavbarPresenter'
import { NavbarController } from '../../src/controllers/NavbarController'

export class NavbarControllerBuilder {
    private fetchBookmarkCityWeather: () => void = () => {}
    private onVmUpdate: (subscriber: Subscriber<NavbarPresenterVM>) => void = subscriber => subscriber(this.vm)

    constructor(private vm: NavbarPresenterVM = new NavbarPresenterVM()) {
    }

    withFetchBookmarkCityWeather(fetchBookmarkCityWeather: () => void) {
        this.fetchBookmarkCityWeather = fetchBookmarkCityWeather
        return this
    }

    build(): NavbarController {
        return {
            vm: this.vm,
            subscribeVM: this.onVmUpdate,
            fetchBookmarkCityWeather: this.fetchBookmarkCityWeather
        } as NavbarController
    }
}
