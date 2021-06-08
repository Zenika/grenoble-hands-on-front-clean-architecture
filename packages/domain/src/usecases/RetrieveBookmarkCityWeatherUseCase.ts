import { BookmarkRepository, RetrieveBookmarkCityWeatherPresentation, WeatherRepository } from '@grenoble-hands-on/domain'

export class RetrieveBookmarkCityWeatherUseCase {
    constructor(private readonly bookmarkRepository: BookmarkRepository,
                private readonly weatherRepository: WeatherRepository) {

    }

    execute(presentation: RetrieveBookmarkCityWeatherPresentation) {
        this.bookmarkRepository.getBookmarkCity().then(cityBookmark => {
            if (cityBookmark != null) {
                this.weatherRepository.getCityDailyWeather(cityBookmark).then(dailyWeather => {
                    presentation.notifyBookmarkedCityWeather(dailyWeather[0])
                })
            } else {
                presentation.notifyNoBookmarkedCity()
            }
        })
    }
}
