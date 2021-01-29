import { AddCityPresenterFactory, FakeNavigation } from '@grenoble-hands-on/web-adapters'
import { AddCityUseCaseBuilder } from '../../builder/AddCityUseCaseBuilder'

describe('AddCityPresenterFactory', () => {
    test('create a AddCityPresenter', () => {
        // Given
        const factory = new AddCityPresenterFactory(
            new AddCityUseCaseBuilder().build(),
            new FakeNavigation()
        )

        // When
        const presenter = factory.build()

        // Then
        expect(presenter).not.toBeNull()
    })
})
