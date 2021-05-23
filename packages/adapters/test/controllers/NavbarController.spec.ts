import { NavbarController, NavbarPresenter } from '@grenoble-hands-on/web-adapters'
import { RetrieveBookmarkCityWeatherUseCaseBuilder } from '../builder/RetrieveBookmarkCityWeatherUseCaseBuilder'
import { DailyWeather, WeatherState } from '@grenoble-hands-on/domain'

describe('NavbarController', () => {

    test('display bookmark city weather when has bookmarked city', () => {
        // Given
        const bookmarkCityWeather: DailyWeather = {
            type: 'daily',
            weather: WeatherState.fog,
            day: '31/05/2021',
            temperatureMin: 12,
            temperatureMax: 28,
            unite: 'C'
        }
        const useCase = new RetrieveBookmarkCityWeatherUseCaseBuilder()
            .withExecute(presenter => presenter.notifyBookmarkedCityWeather(bookmarkCityWeather))
            .build()
        const controller = new NavbarController(useCase, new NavbarPresenter())

        // When
        controller.fetchBookmarkCityWeather()

        // Then
        expect(controller.vm.bookmarkCityWeather).toBe(bookmarkCityWeather)
    })

    test('display warning for no bookmark city weather when has not bookmarked city', () => {
        // Given
        const useCase = new RetrieveBookmarkCityWeatherUseCaseBuilder()
            .withExecute(presenter => presenter.notifyNoBookmarkedCity())
            .build()
        const controller = new NavbarController(useCase, new NavbarPresenter())

        // When
        controller.fetchBookmarkCityWeather()

        // Then
        expect(controller.vm.bookmarkCityWeatherMessage).toBe('No city bookmarked')
    })

})
