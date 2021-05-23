import { DailyWeather } from '@grenoble-hands-on/domain'

export interface RetrieveBookmarkCityWeatherPresentation {
    notifyBookmarkedCityWeather(dailyWeather: DailyWeather): void

    notifyNoBookmarkedCity(): void
}
