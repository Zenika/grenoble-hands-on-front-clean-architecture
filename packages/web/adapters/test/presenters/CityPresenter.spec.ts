import {
    GeoPosition,
    GetCityPresentation,
    GetCityRequest,
    RetrieveWeatherPresentation,
    RetrieveWeatherRequest
} from '@grenoble-hands-on/domain'
import { CityPresenter } from '@grenoble-hands-on/web-adapters'
import { GetCityUseCaseBuilder } from '../builder/GetCityUseCaseBuilder'
import { RetrieveCityWeatherUseCaseBuilder } from '../builder/RetrieveCityWeatherUseCaseBuilder'

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
        const retrieveCityWeatherUseCase1 = new RetrieveCityWeatherUseCaseBuilder().build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityWeatherUseCase1);

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

    test('display loading indicator on pending request', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityWeatherUseCase = new RetrieveCityWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresentation) => {
                presenter.displayStartLoading()
            })
            .build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityWeatherUseCase);

        // When
        await presenter.fetchCityWithWeather("GRENOBLE")

        // Then
        expect(presenter.vm.loading).toBeTruthy()
    });

    test('hide loading indicator on finished request', async () => {
        // Given
        const cityUseCase = new GetCityUseCaseBuilder().build()
        const retrieveCityWeatherUseCase = new RetrieveCityWeatherUseCaseBuilder()
            .withExecute((request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresentation) => {
                presenter.displayFinishLoading()
            })
            .build()
        const presenter = new CityPresenter(cityUseCase, retrieveCityWeatherUseCase);
        presenter.vm.loading = true

        // When
        await presenter.fetchCityWithWeather("GRENOBLE")

        // Then
        expect(presenter.vm.loading).toBeFalsy()
    });
});
