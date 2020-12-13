import {GeoPosition} from "../../src/entities/GeoPosition";
import {City} from "../../src/entities/City";
import {GetCitiesUseCase} from "../../src/usecases/GetCitiesUseCase";
import {CityRepository} from "../../src/ports/repositories/CityRepository";

describe('Get cities use case', () => {

    test('display list of cities', async () => {
        // Given
        const cityRepository: Partial<CityRepository> = {
            getCities(): Promise<City[]> {
                return Promise.resolve([
                    { name: 'Grenoble', position: new GeoPosition(45, 5)},
                    { name: 'Lyon', position: new GeoPosition(44, 4)},
                ])
            }
        }
        const useCase = new GetCitiesUseCase(cityRepository as CityRepository)

        // When
        const cities = await new Promise(resolve => {
            useCase.execute({
                displayCities(cities: City[]) {
                    resolve(cities)
                }
            })
        })

        // Then
        expect(cities).toHaveLength(2)
    });

});
