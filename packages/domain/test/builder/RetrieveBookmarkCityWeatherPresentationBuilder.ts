import { DailyWeather, RetrieveBookmarkCityWeatherPresentation } from '@grenoble-hands-on/domain'

export class RetrieveBookmarkCityWeatherPresentationBuilder {
    private notifyBookmarkedCityWeather: (dailyWeather: DailyWeather) => void = () => null
    private notifyNoBookmarkedCity: () => void = () => null

    withNotifyBookmarkedCityWeather(notifyBookmarkedCityWeather: (dailyWeather: DailyWeather) => void) {
        this.notifyBookmarkedCityWeather = notifyBookmarkedCityWeather
        return this
    }

    withNotifyNoBookmarkedCity(notifyNoBookmarkedCity: () => void) {
        this.notifyNoBookmarkedCity = notifyNoBookmarkedCity
        return this
    }

    build(): RetrieveBookmarkCityWeatherPresentation {
        return {
            notifyBookmarkedCityWeather: this.notifyBookmarkedCityWeather,
            notifyNoBookmarkedCity: this.notifyNoBookmarkedCity,
        }
    }
}
