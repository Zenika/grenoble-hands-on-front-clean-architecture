import { CityPresenterFactory } from '@grenoble-hands-on/web-adapters'
import { GetCityUseCaseBuilder } from '../../builder/GetCityUseCaseBuilder'
import { RetrieveCityWeatherUseCaseBuilder } from '../../builder/RetrieveCityWeatherUseCaseBuilder'

describe('CityPresenterFactory', () => {
    test('create a CityPresenterFactory', () => {
        // Given
        const factory = new CityPresenterFactory(
            new GetCityUseCaseBuilder().build(),
            new RetrieveCityWeatherUseCaseBuilder().build()
        )

        // When
        const presenter = factory.build()

        // Then
        expect(presenter).not.toBeNull()
    })
})
