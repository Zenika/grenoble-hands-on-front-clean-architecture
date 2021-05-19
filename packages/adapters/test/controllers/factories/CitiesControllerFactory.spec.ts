import { CitiesControllerFactory } from '@grenoble-hands-on/web-adapters'
import { GetCitiesUseCaseBuilder } from '../../builder/GetCitiesUseCaseBuilder'

describe('CitiesPresenterFactory', () => {
    test('create a CitiesPresenter', () => {
        // Given
        const factory = new CitiesControllerFactory(
            new GetCitiesUseCaseBuilder().build()
        )

        // When
        const presenter = factory.build()

        // Then
        expect(presenter).not.toBeNull()
    })
})
