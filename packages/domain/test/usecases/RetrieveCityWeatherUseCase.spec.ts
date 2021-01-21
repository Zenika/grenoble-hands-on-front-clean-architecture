import {GeoPosition} from "../../src/entities/GeoPosition";
import {RetrieveCityWeatherUseCase} from "../../src/usecases/RetrieveCityWeatherUseCase";
import {DailyWeather} from "../../src/entities/DailyWeather";
import {RetrieveWeatherPresentation} from "../../src/ports/presenters/RetrieveWeatherPresentation";
import {WeatherRepository} from "../../src/ports/repositories/WeatherRepository";
import {RetrieveWeatherRequest} from "../../src/ports/request/RetrieveWeatherRequest";

function createPresenter(partialPresenter: Partial<RetrieveWeatherPresentation>): RetrieveWeatherPresentation {
    return {
        displayWeather(_) {},
        displayStartLoading() {},
        displayFinishLoading() {},
        ...partialPresenter
    };
}

describe('Retrieve city weather use case', () => {

    test('display weather for grenoble for next week', async () => {
        // Given
        const grenoblePosition = new GeoPosition(45.5, 5.2)
        const weatherData = [
            {day: new Date(), temperatureMax: 25, temperatureMin: 18, weather: 'sunny'},
            {day: new Date(), temperatureMax: 22, temperatureMin: 19, weather: 'cloud'}
        ];
        const weatherRepository: Partial<WeatherRepository> = {
            getWeekWeather(_: GeoPosition): Promise<DailyWeather[]> {
                return Promise.resolve(weatherData)
            }
        }
        const useCase = new RetrieveCityWeatherUseCase(weatherRepository as WeatherRepository)
        const weatherRequest = new RetrieveWeatherRequest(grenoblePosition);

        // When
        const weather: DailyWeather[] = await new Promise(resolve => {
            useCase.execute(weatherRequest, createPresenter({
                displayWeather(weather: DailyWeather[]) {
                    resolve(weather)
                }
            }))
        });

        // Then
        expect(weather).not.toBeNull()
        expect(weather).toHaveLength(2)
        expect(weather).toBe(weatherData)
    });

    test('display loader while fetching', async () => {
        const grenoblePosition = new GeoPosition(45.5, 5.2)
        const weatherRepository: Partial<WeatherRepository> = {
            getWeekWeather(_: GeoPosition): Promise<DailyWeather[]> {
                return Promise.resolve([])
            }
        }
        const useCase = new RetrieveCityWeatherUseCase(weatherRepository as WeatherRepository)
        const weatherRequest = new RetrieveWeatherRequest(grenoblePosition);

        // When
        let hasStartedLoading = false
        let hasFinishedLoading = false
        await new Promise<void>(resolve => {
            useCase.execute(weatherRequest, createPresenter({
                displayStartLoading() {
                    hasStartedLoading = true
                },
                displayFinishLoading() {
                    hasFinishedLoading = true
                    resolve()
                }
            }))
        });

        // Then
        expect(hasStartedLoading).toBeTruthy()
        expect(hasFinishedLoading).toBeTruthy()
    })

});
