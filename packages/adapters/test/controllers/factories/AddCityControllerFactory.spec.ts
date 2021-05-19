import { AddCityControllerFactory, FakeNavigation } from '@grenoble-hands-on/web-adapters'
import { AddCityUseCaseBuilder } from '../../builder/AddCityUseCaseBuilder'

describe('AddCityPresenterFactory', () => {
    test('create a AddCityPresenter', () => {
        // Given
        const factory = new AddCityControllerFactory(
            new AddCityUseCaseBuilder().build(),
            new FakeNavigation()
        )

        // When
        const presenter = factory.build()

        // Then
        expect(presenter).not.toBeNull()
    })
})
