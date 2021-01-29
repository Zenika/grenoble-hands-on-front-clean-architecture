import { CitiesPresenterFactory } from '@grenoble-hands-on/web-adapters'
import { GetCitiesUseCaseBuilder } from '../../builder/GetCitiesUseCaseBuilder'

describe('CitiesPresenterFactory', () => {
    test('create a CitiesPresenter', () => {
        // Given
        const factory = new CitiesPresenterFactory(
            new GetCitiesUseCaseBuilder().build()
        )

        // When
        const presenter = factory.build()

        // Then
        expect(presenter).not.toBeNull()
    })
})
