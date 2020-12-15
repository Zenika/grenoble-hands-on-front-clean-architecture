import {GetCitiesPresenter} from "../../../../domain/src/ports/presenters/GetCitiesPresenter";
import {GeoPosition} from "../../../../domain/src/entities/GeoPosition";
import {GetCitiesUseCase} from "../../../../domain/src/usecases/GetCitiesUseCase";
import {CitiesPresenter} from "../../src/presenters/CitiesPresenter";

function createUseCase(partialUseCase: Partial<GetCitiesUseCase>) {
    return partialUseCase as GetCitiesUseCase;
}

describe('CitiesPresenter', () => {

    test('fetch cities update vm', async () => {
        // Given
        const cities = [{name: "GRENOBLE", position: new GeoPosition(45.183916, 5.703630)}];

        const getCitiesUseCase = createUseCase({
            async execute(presenter: GetCitiesPresenter): Promise<void> {
                presenter.displayCities(cities)
            }
        });
        const presenter = new CitiesPresenter(getCitiesUseCase);

        // When
        await presenter.fetchCities()


        // Then
        expect(presenter.vm.cities).toEqual(cities)
    });

});
