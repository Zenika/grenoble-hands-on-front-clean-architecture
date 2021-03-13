import { HourlyWeather, RetrieveCityHourlyWeatherUseCase, RetrieveWeatherRequest, WeatherState } from '@grenoble-hands-on/domain'
import { RetrieveHourlyWeatherPresentationBuilder } from '@grenoble-hands-on/domain'
import { WeatherRepositoryBuilder } from '../builder/WeatherRepositoryBuilder'

describe('Retrieve city hourly weather use case', () => {

    test('display weather in C° for grenoble for next hours', async () => {
        // Given
        const weatherData: HourlyWeather[] = [
            { time: '09:00', temperature: 25, weather: WeatherState.sunny, unite: 'C' },
            { time: '10:00', temperature: 22, weather: WeatherState.cloudy, unite: 'C' },
            { time: '11:00', temperature: 23, weather: WeatherState.cloudy, unite: 'C' }
        ]
        const weatherRepository = new WeatherRepositoryBuilder()
            .withGetCityHourlyWeather(_ => Promise.resolve(weatherData))
            .build()
        const useCase = new RetrieveCityHourlyWeatherUseCase(weatherRepository)
        const weatherRequest = new RetrieveWeatherRequest('Grenoble', 'C')

        // When
        const weather: HourlyWeather[] = await new Promise(resolve => {
            const presentation = new RetrieveHourlyWeatherPresentationBuilder()
                .withDisplayWeather((weather: HourlyWeather[]) => resolve(weather))
                .build()
            useCase.execute(weatherRequest, presentation)
        })

        // Then
        expect(weather).not.toBeNull()
        expect(weather).toHaveLength(3)
        expect(weather).toBe(weatherData)
    })

    test('display weather in F° for grenoble for next hours', async () => {
        // Given
        const weatherData: HourlyWeather[] = [
            { time: '09:00', temperature: 25, weather: WeatherState.sunny, unite: 'C' },
        ]
        const weatherRepository = new WeatherRepositoryBuilder()
            .withGetCityHourlyWeather(_ => Promise.resolve(weatherData))
            .build()
        const useCase = new RetrieveCityHourlyWeatherUseCase(weatherRepository)
        const weatherRequest = new RetrieveWeatherRequest('Grenoble', 'F')

        // When
        const weather: HourlyWeather[] = await new Promise(resolve => {
            const presentation = new RetrieveHourlyWeatherPresentationBuilder()
                .withDisplayWeather((weather: HourlyWeather[]) => resolve(weather))
                .build()
            useCase.execute(weatherRequest, presentation)
        })

        // Then
        expect(weather).not.toBeNull()
        expect(weather[0]).toEqual({ time: '09:00', temperature: 77, weather: WeatherState.sunny, unite: 'F' })
    })

})
