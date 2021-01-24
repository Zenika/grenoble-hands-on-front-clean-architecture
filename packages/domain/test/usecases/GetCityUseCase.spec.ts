import {
    CityBuilder,
    CityRepository,
    CityRepositoryBuilder,
    GetCityPresentationBuilder,
    GetCityRequest,
    GetCityUseCase
} from "@grenoble-hands-on/domain";

describe('Get city use case', () => {

    test('display city', async () => {
        // Given
        const grenoble = CityBuilder.example().build();
        const cityRepository = new CityRepositoryBuilder()
            .withGetCity(() => Promise.resolve(grenoble))
            .build()
        const useCase = new GetCityUseCase(cityRepository as CityRepository)

        // When
        const city = await new Promise(resolve => {
            const presentation = new GetCityPresentationBuilder()
                .withDisplayCity(city => resolve(city))
                .build()
            useCase.execute(new GetCityRequest(grenoble.name), presentation)
        })

        // Then
        expect(city).toBe(grenoble)
    });

});
