import {
    GeoPosition,
    GetCityPresentation,
    GetCityRequest,
    GetCityUseCaseBuilder,
    RetrieveCityWeatherUseCaseBuilder,
    RetrieveWeatherPresentation,
    RetrieveWeatherRequest
} from "@grenoble-hands-on/domain";
import {CityPresenter} from "@grenoble-hands-on/web-adapters";

describe('CityPresenter', () => {

    test('display city update city vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder()
            .withExecute((request: GetCityRequest, presenter: GetCityPresentation) => {
                presenter.displayCity({
                    name: "GRENOBLE",
                    position: new GeoPosition(45, 5)
                })
            })
            .build()
        const presenter = new CityPresenter(cityUseCase, RetrieveCityWeatherUseCaseBuilder.Stub());

        // When
        await presenter.fetchCityWithWeather("GRENOBLE")

        // Then
        expect(presenter.vm.city?.name).toBe("GRENOBLE")
    });

    test('display city update weather vm', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder()
            .withExecute((request: GetCityRequest, presenter: GetCityPresentation) => {
                presenter.displayCity({
                    name: "GRENOBLE",
                    position: new GeoPosition(45, 5)
                })
            })
            .build()
        const retrieveCityWeatherUseCase = new RetrieveCityWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresentation) => {
                presenter.displayWeather([
                    {day: '12/01/2021', weather: "sunny", temperatureMin: 9, temperatureMax: 19}
                ])
            })
            .build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityWeatherUseCase);

        // When
        await presenter.fetchCityWithWeather("GRENOBLE")

        // Then
        expect(presenter.vm.weather).toHaveLength(1)
        expect(presenter.vm.weather?.[0].weather).toBe('sunny')
    });
});
