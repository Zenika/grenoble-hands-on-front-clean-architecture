import { CityBuilder, GetCitiesPresentation } from '@grenoble-hands-on/domain'
import { CitiesController, CitiesPresenter } from '@grenoble-hands-on/web-adapters'
import { GetCitiesUseCaseBuilder } from '../builder/GetCitiesUseCaseBuilder'
import { BookmarkCityUseCaseBuilder } from '../builder/BookmarkCityUseCaseBuilder'
import { GetBookmarkCityUseCaseBuilder } from '../builder/GetBookmarkCityUseCaseBuilder'

describe('CitiesController', () => {

    test('fetch cities update cities vm', async () => {
        // Given
        const cities = [CityBuilder.example().build()]
        const getCitiesUseCase = new GetCitiesUseCaseBuilder()
            .withExecute((presenter: GetCitiesPresentation) => {
                presenter.displayCities(cities)
                return Promise.resolve()
            })
            .build()
        const bookmarkCityUseCase = new BookmarkCityUseCaseBuilder().build()
        const getBookmarkCityUseCase = new GetBookmarkCityUseCaseBuilder().build()
        const presenter = new CitiesController(getCitiesUseCase, bookmarkCityUseCase, getBookmarkCityUseCase, new CitiesPresenter())

        // When
        await presenter.fetchCities()

        // Then
        expect(presenter.vm.cities).toEqual(cities)
    })

    test('fetch cities update bookmark city vm', async () => {
        // Given
        const cityId = CityBuilder.example().build().name
        const getCitiesUseCase = new GetCitiesUseCaseBuilder().build()
        const bookmarkCityUseCase = new BookmarkCityUseCaseBuilder().build()
        const getBookmarkCityUseCase = new GetBookmarkCityUseCaseBuilder()
            .withExecute(presentation => presentation.notifyCityBookmarked(cityId))
            .build()
        const presenter = new CitiesController(getCitiesUseCase, bookmarkCityUseCase, getBookmarkCityUseCase, new CitiesPresenter())

        // When
        await presenter.fetchCities()

        // Then
        expect(presenter.vm.favoriteCityId).toEqual(cityId)
    })

    test('display favorite city when bookmark city', async () => {
        // Given
        const cityId = 'GRENOBLE'
        const getCitiesUseCase = new GetCitiesUseCaseBuilder().build()
        const bookmarkCityUseCase = new BookmarkCityUseCaseBuilder()
            .withExecute((request, presentation) => presentation.notifyCityBookmarked(request.city))
            .build()
        const getBookmarkCityUseCase = new GetBookmarkCityUseCaseBuilder().build()
        const presenter = new CitiesController(getCitiesUseCase, bookmarkCityUseCase, getBookmarkCityUseCase, new CitiesPresenter())
        // When
        await presenter.bookmarkCity(cityId)

        // Then
        expect(presenter.vm.favoriteCityId).toEqual(cityId)
    })

    test('remove favorite city when bookmark city already marked', async () => {
        // Given
        const cityId = 'GRENOBLE'
        const getCitiesUseCase = new GetCitiesUseCaseBuilder().build()
        const bookmarkCityUseCase = new BookmarkCityUseCaseBuilder()
            .withExecute((request, presentation) => presentation.notifyCityRemovedFromBookmark())
            .build()
        const getBookmarkCityUseCase = new GetBookmarkCityUseCaseBuilder().build()
        const presenter = new CitiesController(getCitiesUseCase, bookmarkCityUseCase, getBookmarkCityUseCase, new CitiesPresenter())
        presenter.vm.favoriteCityId = cityId

        // When
        await presenter.bookmarkCity(cityId)

        // Then
        expect(presenter.vm.favoriteCityId).toBeNull()
    })

})
