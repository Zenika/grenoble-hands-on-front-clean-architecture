import {
    DailyWeather,
    DailyWeatherBuilder,
    RetrieveCityDailyWeatherUseCase,
    RetrieveWeatherRequest,
    WeatherState,
} from '@grenoble-hands-on/domain'
import { WeatherRepositoryBuilder } from '../builder/WeatherRepositoryBuilder'
import { RetrieveDailyWeatherPresentationBuilder } from '../builder/RetrieveDailyWeatherPresentationBuilder'

describe('Retrieve city weather use case', () => {

    test('display weather in C° for grenoble for next days', async () => {
        // Given
        const weatherData: DailyWeather[] = [
            DailyWeatherBuilder.sunny(),
            DailyWeatherBuilder.cloudy()
        ]
        return new Promise<DailyWeather[]>(resolve => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityDailyWeather(_ => Promise.resolve(weatherData))
                .build()
            const useCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
            const weatherRequest = new RetrieveWeatherRequest('Grenoble', 'C')

            // When
            const presentation = new RetrieveDailyWeatherPresentationBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build()
            useCase.execute(weatherRequest, presentation)
        }).then((weather: DailyWeather[]) => {
            // Then
            expect(weather).not.toBeNull()
            expect(weather).toHaveLength(2)
            expect(weather).toEqual(weatherData)
        })
    })

    test('display weather in F° for grenoble for next days', async () => {
        return new Promise<DailyWeather[]>(resolve => {
            // Given
            const weatherData: DailyWeather[] = [
                { type: 'daily', day: '12/01/2021', temperatureMax: 25, temperatureMin: 18, weather: WeatherState.sunny, unite: 'C' },
            ]
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityDailyWeather(_ => Promise.resolve(weatherData))
                .build()
            const useCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
            const weatherRequest = new RetrieveWeatherRequest('Grenoble', 'F')

            // When
            const presentation = new RetrieveDailyWeatherPresentationBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build()
            useCase.execute(weatherRequest, presentation)
        }).then((weather: DailyWeather[]) => {
            // Then
            expect(weather).not.toBeNull()
            expect(weather[0]).toEqual({
                type: 'daily',
                day: '12/01/2021',
                temperatureMax: 77,
                temperatureMin: 64.4,
                weather: WeatherState.sunny,
                unite: 'F'
            })
        })
    })
})
