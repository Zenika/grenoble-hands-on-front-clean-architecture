import { Presenter } from './Presenter'
import { DailyWeather, RetrieveBookmarkCityWeatherPresentation } from '@grenoble-hands-on/domain'

export class NavbarPresenterVM {
    bookmarkCityWeather: DailyWeather | undefined
    bookmarkCityWeatherMessage: string | undefined
}

export class NavbarPresenter extends Presenter<NavbarPresenterVM> implements RetrieveBookmarkCityWeatherPresentation{

    constructor() {
        super(new NavbarPresenterVM())
    }

    notifyBookmarkedCityWeather(dailyWeather: DailyWeather): void {
        this.vm.bookmarkCityWeather = dailyWeather;
    }

    notifyNoBookmarkedCity(): void {
        this.vm.bookmarkCityWeatherMessage = 'No city bookmarked'
    }
}
