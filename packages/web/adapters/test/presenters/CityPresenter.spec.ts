import {CityPresenter} from "../../src/presenters/CityPresenter";
import {GetCityUseCase} from "../../../../domain/src/usecases/GetCityUseCase";
import {RetrieveCityWeatherUseCase} from "../../../../domain/src/usecases/RetrieveCityWeatherUseCase";
import {GetCityRequest} from "../../../../domain/src/ports/request/GetCityRequest";
import {GetCityPresenter} from "../../../../domain/src/ports/presenters/GetCityPresenter";
import {GeoPosition} from "../../../../domain/src/entities/GeoPosition";
import {RetrieveWeatherRequest} from "../../../../domain/src/ports/request/RetrieveWeatherRequest";
import {RetrieveWeatherPresenter} from "../../../../domain/src/ports/presenters/RetrieveWeatherPresenter";

function createGetCityUseCase(partialUseCase: Partial<GetCityUseCase>) {
    return partialUseCase as GetCityUseCase;
}

function createRetrieveWeatherUseCase(partialUseCase: Partial<RetrieveCityWeatherUseCase>) {
    return {
        async execute(_: RetrieveWeatherRequest, __: RetrieveWeatherPresenter): Promise<void> {

        },
        ...partialUseCase
    } as RetrieveCityWeatherUseCase;
}

describe('CityPresenter', () => {

    test('display city update city vm', async () => {
        // Given
        const cityUseCase = createGetCityUseCase({
            async execute(request: GetCityRequest, presenter: GetCityPresenter): Promise<void> {
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
            async execute(request: GetCityRequest, presenter: GetCityPresenter): Promise<void> {
                presenter.displayCity({
                    name: "GRENOBLE",
                    position: new GeoPosition(45, 5)
                })
            }
        });
        const retrieveCityWeatherUseCase = createRetrieveWeatherUseCase({
            async execute(request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresenter): Promise<void> {
                presenter.displayWeather([
                    { day: new Date(), weather: "sunny", temperatureMin: 9, temperatureMax: 19}
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
