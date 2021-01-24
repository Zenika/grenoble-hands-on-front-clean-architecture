import {
    GeoPosition,
    GetCityPresentation,
    GetCityRequest,
    GetCityUseCase,
    RetrieveWeatherPresentation,
    RetrieveWeatherRequest,
    RetrieveCityWeatherUseCase
} from "@grenoble-hands-on/domain";
import {CityPresenter} from "../../src";

function createGetCityUseCase(partialUseCase: Partial<GetCityUseCase>) {
    return partialUseCase as GetCityUseCase;
}

function createRetrieveWeatherUseCase(partialUseCase: Partial<RetrieveCityWeatherUseCase>) {
    return {
        async execute(_: RetrieveWeatherRequest, __: RetrieveWeatherPresentation): Promise<void> {

        },
        ...partialUseCase
    } as RetrieveCityWeatherUseCase;
}

describe('CityPresenter', () => {

    test('display city update city vm', async () => {
        // Given
        const cityUseCase = createGetCityUseCase({
            async execute(request: GetCityRequest, presenter: GetCityPresentation): Promise<void> {
                presenter.displayCity({
                    name: "GRENOBLE",
                    position: new GeoPosition(45, 5)
                })
            }
        });
        const presenter = new CityPresenter(cityUseCase, createRetrieveWeatherUseCase({}));

        // When
        await presenter.fetchCityWithWeather("GRENOBLE")

        // Then
        expect(presenter.vm.city?.name).toBe("GRENOBLE")
    });

    test('display city update weather vm', async () => {
        // Given
        const cityUseCase = createGetCityUseCase({
            async execute(request: GetCityRequest, presenter: GetCityPresentation): Promise<void> {
                presenter.displayCity({
                    name: "GRENOBLE",
                    position: new GeoPosition(45, 5)
                })
            }
        });
        const retrieveCityWeatherUseCase = createRetrieveWeatherUseCase({
            async execute(request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresentation): Promise<void> {
                presenter.displayWeather([
                    { day: '12/01/2021', weather: "sunny", temperatureMin: 9, temperatureMax: 19}
                ])
            }
        });
        const presenter = new CityPresenter(cityUseCase, retrieveCityWeatherUseCase);

        // When
        await presenter.fetchCityWithWeather("GRENOBLE")

        // Then
        expect(presenter.vm.weather).toHaveLength(1)
        expect(presenter.vm.weather?.[0].weather).toBe('sunny')
    });
});
