import {City, GeoPosition, GetCitiesUseCaseBuilder} from "@grenoble-hands-on/domain";
import {CityRepositoryBuilder} from "@grenoble-hands-on/domain";

describe('Get cities use case', () => {

    test('display list of cities', async () => {
        // Given
        const cityRepository = new CityRepositoryBuilder()
            .withGetCities(() => Promise.resolve([
                {name: 'Grenoble', position: new GeoPosition(45, 5)},
                {name: 'Lyon', position: new GeoPosition(44, 4)},
            ]))
            .build()
        const useCase = new GetCitiesUseCaseBuilder().withCityRepository(cityRepository).build()

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
