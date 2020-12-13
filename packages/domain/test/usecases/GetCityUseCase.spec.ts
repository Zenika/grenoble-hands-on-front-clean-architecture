import {GeoPosition} from "../../src/entities/GeoPosition";
import {City} from "../../src/entities/City";
import {GetCityUseCase} from "../../src/usecases/GetCityUseCase";
import {CityRepository} from "../../src/ports/repositories/CityRepository";
import {GetCityRequest} from "../../src/ports/request/GetCityRequest";

describe('Get city use case', () => {

    test('display city', async () => {
        // Given
        const cityName = 'Grenoble';
        const grenoble = {name: cityName, position: new GeoPosition(45, 5)};
        const cityRepository: Partial<CityRepository> = {
            getCity(_: string): Promise<City> {
                return Promise.resolve(grenoble)
            }
        }
        const useCase = new GetCityUseCase(cityRepository as CityRepository)

        // When
        const city = await new Promise(resolve => {
            useCase.execute(new GetCityRequest(cityName), {
                displayCity(city: City) {
                    resolve(city)
                }
            })
        })

        // Then
        expect(city).toBe(grenoble)
    });

});
