import { CityBuilder, GetCitiesPresentation } from '@grenoble-hands-on/domain'
import { CitiesPresenter } from '@grenoble-hands-on/web-adapters'
import { GetCitiesUseCaseBuilder } from '../builder/GetCitiesUseCaseBuilder'

describe('CitiesPresenter', () => {

    test('fetch cities update vm', async () => {
        // Given
        const cities = [CityBuilder.example().build()]
        const getCitiesUseCase = new GetCitiesUseCaseBuilder()
            .withExecute((presenter: GetCitiesPresentation) => {
                presenter.displayCities(cities)
                return Promise.resolve()
            })
            .build()
        const presenter = new CitiesPresenter(getCitiesUseCase)

        // When
        await presenter.fetchCities()

        // Then
        expect(presenter.vm.cities).toEqual(cities)
    })

})
