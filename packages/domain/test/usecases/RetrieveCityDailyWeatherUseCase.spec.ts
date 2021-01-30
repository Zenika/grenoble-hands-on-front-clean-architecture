import { DailyWeather, RetrieveCityDailyWeatherUseCase, RetrieveWeatherRequest, WeatherRepository, } from '@grenoble-hands-on/domain'
import { WeatherRepositoryBuilder } from '../builder/WeatherRepositoryBuilder'
import { RetrieveDailyWeatherPresentationBuilder } from '../builder/RetrieveDailyWeatherPresentationBuilder'

describe('Retrieve city weather use case', () => {

    test('display weather for grenoble for next days', async () => {
        // Given
        const weatherData = [
            {day: '12/01/2021', temperatureMax: 25, temperatureMin: 18, weather: 'sunny'},
            {day: '13/01/2021', temperatureMax: 22, temperatureMin: 19, weather: 'cloud'}
        ];
        const weatherRepository = new WeatherRepositoryBuilder()
            .withGetCityWeekWeather(_ => Promise.resolve(weatherData))
            .build()
        const useCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
        const weatherRequest = new RetrieveWeatherRequest("Grenoble");

        // When
        const weather: DailyWeather[] = await new Promise(resolve => {
            const presentation = new RetrieveDailyWeatherPresentationBuilder()
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
            getCityDailyWeather(_: string): Promise<DailyWeather[]> {
                return Promise.resolve([])
            }
        }
        const useCase = new RetrieveCityDailyWeatherUseCase(weatherRepository as WeatherRepository)
        const weatherRequest = new RetrieveWeatherRequest("Grenoble");

        // When
        const hasStartedLoading = await new Promise<boolean>(resolve => {
            const presentation = new RetrieveDailyWeatherPresentationBuilder()
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
            getCityDailyWeather(_: string): Promise<DailyWeather[]> {
                return Promise.resolve([])
            }
        }
        const useCase = new RetrieveCityDailyWeatherUseCase(weatherRepository as WeatherRepository)
        const weatherRequest = new RetrieveWeatherRequest("Grenoble");

        // When
        const hasFinishedLoading = await new Promise<boolean>(resolve => {
            const presentation = new RetrieveDailyWeatherPresentationBuilder()
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
