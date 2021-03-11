import { GeoPosition, GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { CityRepositoryBuilder } from '../builder/CityRepositoryBuilder'
import { GetCitiesPresentationBuilder } from '../../src/ports/presenters/GetCitiesPresentationBuilder'

describe('Get cities use case', () => {

    test('display list of cities', async () => {
        // Given
        const cityRepository = new CityRepositoryBuilder()
            .withGetCities(() => Promise.resolve([
                {name: 'Grenoble', position: new GeoPosition(45, 5)},
                {name: 'Lyon', position: new GeoPosition(44, 4)},
            ]))
            .build()
        const useCase = new GetCitiesUseCase(cityRepository)

        // When
        const cities = await new Promise(resolve => {
            const presentation = new GetCitiesPresentationBuilder().withDisplayCities(cities => resolve(cities)).build();
            useCase.execute(presentation)
        })

        // Then
        expect(cities).toHaveLength(2)
    });

});
