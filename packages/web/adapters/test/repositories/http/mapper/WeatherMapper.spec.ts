import { DailyWeather7Timer, WeatherMapper } from '@grenoble-hands-on/web-adapters'

describe('WeatherMapper', () => {
    test('map weather from 7timer to domain', () => {
        // Given
        const weatherFromApi: DailyWeather7Timer = {
            dataseries: [
                {weather: 'cloud', date: '20201213', temp2m: {max: 12, min: 9}, wind10m_max: 5},
                {weather: 'cloud', date: '20201214', temp2m: {max: 13, min: 10}, wind10m_max: 5},
                {weather: 'sunny', date: '20201215', temp2m: {max: 13, min: 10}, wind10m_max: 5}
            ]
        };

        // When
        const weather = WeatherMapper.toDailyDomain(weatherFromApi);

        // Then
        expect(weather).toHaveLength(3)
    });

    test('map date to domain day', () => {
        // Given
        const weatherFromApi: DailyWeather7Timer = {
            dataseries: [
                {weather: 'cloud', date: '20201213', temp2m: {max: 12, min: 9}, wind10m_max: 5}
            ]
        };

        // When
        const weather = WeatherMapper.toDailyDomain(weatherFromApi);

        // Then
        expect(weather[0].day).toEqual("13/12/2020")
    });

    test('map temperature to domain', () => {
        // Given
        const weatherFromApi: DailyWeather7Timer = {
            dataseries: [
                {weather: 'cloud', date: '20201213', temp2m: {max: 12, min: 9}, wind10m_max: 5}
            ]
        };

        // When
        const weather = WeatherMapper.toDailyDomain(weatherFromApi);

        // Then
        expect(weather[0].temperatureMax).toBe(12)
        expect(weather[0].temperatureMin).toBe(9)
    });
});
