import { CityBuilder, GetCitiesPresentation } from '@grenoble-hands-on/domain'
import { CitiesController, CitiesPresenter } from '@grenoble-hands-on/web-adapters'
import { GetCitiesUseCaseBuilder } from '../builder/GetCitiesUseCaseBuilder'

describe('CitiesController', () => {

    test('fetch cities update vm', async () => {
        // Given
        const cities = [CityBuilder.example().build()]
        const getCitiesUseCase = new GetCitiesUseCaseBuilder()
            .withExecute((presenter: GetCitiesPresentation) => {
                presenter.displayCities(cities)
                return Promise.resolve()
            })
            .build()
        const presenter = new CitiesController(getCitiesUseCase, new CitiesPresenter())

        // When
        await presenter.fetchCities()

        // Then
        expect(presenter.vm.cities).toEqual(cities)
    })

})
