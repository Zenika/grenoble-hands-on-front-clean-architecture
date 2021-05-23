import { BookmarkRepositoryBuilder } from '../builder/BookmarkRepositoryBuilder'
import { DailyWeather, DailyWeatherBuilder, RetrieveBookmarkCityWeatherUseCase, WeatherState } from '@grenoble-hands-on/domain'
import { WeatherRepositoryBuilder } from '../builder/WeatherRepositoryBuilder'
import { RetrieveBookmarkCityWeatherPresentationBuilder } from '../builder/RetrieveBookmarkCityWeatherPresentationBuilder'

describe('Retrieve bookmark city weather use case', () => {

    test('notify weather of the day for grenoble when bookmarked city is Grenoble', async () => {
        // Given
        const cityBookmark = 'GRENOBLE'
        const weatherOfTheDay: DailyWeather = DailyWeatherBuilder.sunny()
        const bookmarkRepository = new BookmarkRepositoryBuilder()
            .withGetBookmarkCity(() => Promise.resolve(cityBookmark))
            .build()
        const weatherRepository = new WeatherRepositoryBuilder()
            .withGetCityDailyWeather(_ => Promise.resolve([weatherOfTheDay]))
            .build()
        const usecase = new RetrieveBookmarkCityWeatherUseCase(bookmarkRepository, weatherRepository)

        // When
        const weatherOfCityBookmark = await new Promise<DailyWeather>(resolve => {
            const presentation = new RetrieveBookmarkCityWeatherPresentationBuilder()
                .withNotifyBookmarkedCityWeather((weatherOfCityBookmark) => {
                    resolve(weatherOfCityBookmark)
                })
                .build()
            usecase.execute(presentation)
        })

        // Then
        expect(weatherOfCityBookmark).toBe(weatherOfTheDay)
    })

    test('notify no bookmarked city when have not bookmarked city', async () => {
        // Given
        const bookmarkRepository = new BookmarkRepositoryBuilder()
            .withGetBookmarkCity(() => Promise.resolve(null))
            .build()
        const weatherRepository = new WeatherRepositoryBuilder().build()
        const usecase = new RetrieveBookmarkCityWeatherUseCase(bookmarkRepository, weatherRepository)

        const noBookmarkedCity = await new Promise<boolean>(resolve => {
            const presentation = new RetrieveBookmarkCityWeatherPresentationBuilder()
                .withNotifyNoBookmarkedCity(() => {
                    resolve(true)
                })
                .build()
            usecase.execute(presentation)
        })

        expect(noBookmarkedCity).toBeTruthy()
    })

    test.todo('notify cannot retrieve weather city when repository is down')
})
