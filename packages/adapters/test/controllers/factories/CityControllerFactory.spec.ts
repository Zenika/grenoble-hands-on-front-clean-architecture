import { CityControllerFactory } from '@grenoble-hands-on/web-adapters'
import { GetCityUseCaseBuilder } from '../../builder/GetCityUseCaseBuilder'
import { RetrieveCityDailyWeatherUseCaseBuilder } from '../../builder/RetrieveCityDailyWeatherUseCaseBuilder'
import { RetrieveCityHourlyWeatherUseCaseBuilder } from '../../builder/RetrieveCityHourlyWeatherUseCaseBuilder'

describe('CityPresenterFactory', () => {
    test('create a CityPresenterFactory', () => {
        // Given
        const factory = new CityControllerFactory(
            new RetrieveCityDailyWeatherUseCaseBuilder().build(),
            new RetrieveCityHourlyWeatherUseCaseBuilder().build()
        )

        // When
        const presenter = factory.build('GRENOBLE')

        // Then
        expect(presenter).not.toBeNull()
    })
})
