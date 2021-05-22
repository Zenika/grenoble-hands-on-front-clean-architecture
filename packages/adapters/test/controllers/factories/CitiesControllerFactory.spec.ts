import { CitiesControllerFactory } from '@grenoble-hands-on/web-adapters'
import { GetCitiesUseCaseBuilder } from '../../builder/GetCitiesUseCaseBuilder'
import { BookmarkCityUseCaseBuilder } from '../../builder/BookmarkCityUseCaseBuilder'
import { GetBookmarkCityUseCaseBuilder } from '../../builder/GetBookmarkCityUseCaseBuilder'

describe('CitiesPresenterFactory', () => {
    test('create a CitiesPresenter', () => {
        // Given
        const factory = new CitiesControllerFactory(
            new GetCitiesUseCaseBuilder().build(),
            new BookmarkCityUseCaseBuilder().build(),
            new GetBookmarkCityUseCaseBuilder().build()
        )

        // When
        const presenter = factory.build()

        // Then
        expect(presenter).not.toBeNull()
    })
})
