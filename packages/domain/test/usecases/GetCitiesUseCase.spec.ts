import { GeoPosition, GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { CityRepositoryBuilder } from '../builder/CityRepositoryBuilder'
import { GetCitiesPresentationBuilder } from '../builder/GetCitiesPresentationBuilder'

describe('Get cities use case', () => {

    test('display list of cities', async () => {
        return new Promise(resolve => {
            // Given
            const cityRepository = new CityRepositoryBuilder()
                .withGetCities(() => Promise.resolve([
                    { name: 'Grenoble', position: new GeoPosition(45, 5) },
                    { name: 'Lyon', position: new GeoPosition(44, 4) },
                ]))
                .build()
            const useCase = new GetCitiesUseCase(cityRepository)
            const presentation = new GetCitiesPresentationBuilder().withDisplayCities(cities => resolve(cities)).build()

            // When
            useCase.execute(presentation)
        }).then(cities => {
            // Then
            expect(cities).toHaveLength(2)
        })
    })

})
