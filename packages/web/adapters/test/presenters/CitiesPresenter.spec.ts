import {CityBuilder, GetCitiesPresentation, GetCitiesUseCaseStubBuilder} from "@grenoble-hands-on/domain";
import {CitiesPresenterBuilder} from "@grenoble-hands-on/web-adapters";

describe('CitiesPresenter', () => {

    test('fetch cities update vm', async () => {
        // Given
        const cities = [CityBuilder.example().build()];

        const getCitiesUseCase = new GetCitiesUseCaseStubBuilder()
            .withExecute((presenter: GetCitiesPresentation) => {
                presenter.displayCities(cities)
                return Promise.resolve()
            })
            .build()
        const presenter = new CitiesPresenterBuilder()
            .withUseCase(getCitiesUseCase)
            .build();

        // When
        await presenter.fetchCities()


        // Then
        expect(presenter.vm.cities).toEqual(cities)
    });

});
