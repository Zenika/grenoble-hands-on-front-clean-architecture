import { DailyWeather, RetrieveCityDailyWeatherUseCase, RetrieveWeatherRequest, WeatherState, } from '@grenoble-hands-on/domain'
import { WeatherRepositoryBuilder } from '../builder/WeatherRepositoryBuilder'
import { RetrieveDailyWeatherPresentationBuilder } from '@grenoble-hands-on/domain'

describe('Retrieve city weather use case', () => {

    test('display weather in C° for grenoble for next days', async () => {
        // Given
        const weatherData: DailyWeather[] = [
            {day: '12/01/2021', temperatureMax: 25, temperatureMin: 18, weather: WeatherState.sunny, unite: 'C'},
            {day: '13/01/2021', temperatureMax: 22, temperatureMin: 19, weather: WeatherState.cloudy, unite: 'C'}
        ];
        const weatherRepository = new WeatherRepositoryBuilder()
            .withGetCityWeekWeather(_ => Promise.resolve(weatherData))
            .build()
        const useCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
        const weatherRequest = new RetrieveWeatherRequest('Grenoble', 'C');

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
        expect(weather).toEqual(weatherData)
    });

    test('display weather in F° for grenoble for next days', async () => {
        // Given
        const weatherData: DailyWeather[] = [
            {day: '12/01/2021', temperatureMax: 25, temperatureMin: 18, weather: WeatherState.sunny, unite: 'C'},
        ];
        const weatherRepository = new WeatherRepositoryBuilder()
            .withGetCityWeekWeather(_ => Promise.resolve(weatherData))
            .build()
        const useCase = new RetrieveCityDailyWeatherUseCase(weatherRepository)
        const weatherRequest = new RetrieveWeatherRequest("Grenoble", 'F');

        // When
        const weather: DailyWeather[] = await new Promise(resolve => {
            const presentation = new RetrieveDailyWeatherPresentationBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build()
            useCase.execute(weatherRequest, presentation)
        });

        // Then
        expect(weather).not.toBeNull()
        expect(weather[0]).toEqual({day: '12/01/2021', temperatureMax: 77, temperatureMin: 64.4, weather: WeatherState.sunny, unite: 'F'})
    });
});
