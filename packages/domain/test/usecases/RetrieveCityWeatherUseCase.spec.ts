import {
    DailyWeather,
    RetrieveCityWeatherUseCase,
    RetrieveWeatherPresentationBuilder,
    RetrieveWeatherRequest,
    WeatherRepository,
    WeatherRepositoryBuilder
} from '@grenoble-hands-on/domain'

describe('Retrieve city weather use case', () => {

    test('display weather for grenoble for next week', async () => {
        // Given
        const weatherData = [
            {day: '12/01/2021', temperatureMax: 25, temperatureMin: 18, weather: 'sunny'},
            {day: '13/01/2021', temperatureMax: 22, temperatureMin: 19, weather: 'cloud'}
        ];
        const weatherRepository = new WeatherRepositoryBuilder()
            .withGetCityWeekWeather(_ => Promise.resolve(weatherData))
            .build()
        const useCase = new RetrieveCityWeatherUseCase(weatherRepository)
        const weatherRequest = new RetrieveWeatherRequest("Grenoble");

        // When
        const weather: DailyWeather[] = await new Promise(resolve => {
            const presentation = new RetrieveWeatherPresentationBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build()
            useCase.execute(weatherRequest, presentation)
        });

        // Then
        expect(weather).not.toBeNull()
        expect(weather).toHaveLength(2)
        expect(weather).toBe(weatherData)
    });

    test('display loader while fetching', async () => {
        const weatherRepository: Partial<WeatherRepository> = {
            getCityWeekWeather(_: string): Promise<DailyWeather[]> {
                return Promise.resolve([])
            }
        }
        const useCase = new RetrieveCityWeatherUseCase(weatherRepository as WeatherRepository)
        const weatherRequest = new RetrieveWeatherRequest("Grenoble");

        // When
        const hasStartedLoading = await new Promise<boolean>(resolve => {
            const presentation = new RetrieveWeatherPresentationBuilder()
                .withDisplayStartLoading(() => {
                    resolve(true)
                })
                .build()
            useCase.execute(weatherRequest, presentation)
        });

        // Then
        expect(hasStartedLoading).toBeTruthy()
    })

    test('hide loader when fetching ended', async () => {
        const weatherRepository: Partial<WeatherRepository> = {
            getCityWeekWeather(_: string): Promise<DailyWeather[]> {
                return Promise.resolve([])
            }
        }
        const useCase = new RetrieveCityWeatherUseCase(weatherRepository as WeatherRepository)
        const weatherRequest = new RetrieveWeatherRequest("Grenoble");

        // When
        const hasFinishedLoading = await new Promise<boolean>(resolve => {
            const presentation = new RetrieveWeatherPresentationBuilder()
                .withDisplayFinishLoading(() => {
                    resolve(true)
                })
                .build()
            useCase.execute(weatherRequest, presentation)
        });

        // Then
        expect(hasFinishedLoading).toBeTruthy()
    })

});
