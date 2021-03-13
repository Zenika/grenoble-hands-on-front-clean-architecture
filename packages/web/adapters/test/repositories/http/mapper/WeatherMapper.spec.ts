import { DailyWeather7Timer, WeatherMapper } from '@grenoble-hands-on/web-adapters'
import { WeatherState } from '@grenoble-hands-on/domain'

describe('WeatherMapper', () => {
    test('map weather from 7timer to domain', () => {
        // Given
        const weatherFromApi: DailyWeather7Timer = {
            dataseries: [
                { weather: 'cloudy', date: '20201213', temp2m: { max: 12, min: 9 }, wind10m_max: 5 },
                { weather: 'cloudy', date: '20201214', temp2m: { max: 13, min: 10 }, wind10m_max: 5 },
                { weather: 'clear', date: '20201215', temp2m: { max: 13, min: 10 }, wind10m_max: 5 }
            ]
        }

        // When
        const weather = WeatherMapper.toDailyDomain(weatherFromApi)

        // Then
        expect(weather).toHaveLength(3)
    })

    test('map date to domain day', () => {
        // Given
        const weatherFromApi: DailyWeather7Timer = {
            dataseries: [
                { weather: 'cloudy', date: '20201213', temp2m: { max: 12, min: 9 }, wind10m_max: 5 }
            ]
        }

        // When
        const weather = WeatherMapper.toDailyDomain(weatherFromApi)

        // Then
        expect(weather[0].day).toEqual('13/12/2020')
    })

    test('map temperature to domain', () => {
        // Given
        const weatherFromApi: DailyWeather7Timer = {
            dataseries: [
                { weather: 'cloudy', date: '20201213', temp2m: { max: 12, min: 9 }, wind10m_max: 5 }
            ]
        }

        // When
        const weather = WeatherMapper.toDailyDomain(weatherFromApi)

        // Then
        expect(weather[0].temperatureMax).toBe(12)
        expect(weather[0].temperatureMin).toBe(9)
    })


    test.each([
        ['clear', WeatherState.sunny],
        ['clearday', WeatherState.sunny],
        ['clearnight', WeatherState.sunny],
        ['pcloudy', WeatherState.partly_cloudy],
        ['pcloudyday', WeatherState.partly_cloudy],
        ['pcloudynight', WeatherState.partly_cloudy],
        ['windy', WeatherState.partly_cloudy],
        ['windyday', WeatherState.partly_cloudy],
        ['windynight', WeatherState.partly_cloudy],
        ['mcloudy', WeatherState.cloudy_s_sunny],
        ['mcloudynight', WeatherState.cloudy_s_sunny],
        ['mcloudyday', WeatherState.cloudy_s_sunny],
        ['cloudy', WeatherState.cloudy],
        ['cloudyday', WeatherState.cloudy],
        ['cloudynight', WeatherState.cloudy],
        ['fog', WeatherState.fog],
        ['fogday', WeatherState.fog],
        ['fognight', WeatherState.fog],
        ['humidnight', WeatherState.fog],
        ['humidday', WeatherState.fog],
        ['lightrain', WeatherState.rain],
        ['lightrainday', WeatherState.rain],
        ['lightrainnight', WeatherState.rain],
        ['rain', WeatherState.rain],
        ['rainday', WeatherState.rain],
        ['rainnight', WeatherState.rain],
        ['oshower', WeatherState.rain_s_sunny],
        ['oshowerday', WeatherState.rain_s_sunny],
        ['oshowernight', WeatherState.rain_s_sunny],
        ['ishower', WeatherState.sunny_s_rain],
        ['ishowerday', WeatherState.sunny_s_rain],
        ['ishowernight', WeatherState.sunny_s_rain],
        ['lightsnow', WeatherState.snow_light],
        ['lightsnowday', WeatherState.snow_light],
        ['lightsnownight', WeatherState.snow_light],
        ['snow', WeatherState.snow],
        ['snowday', WeatherState.snow],
        ['snownight', WeatherState.snow],
        ['rainsnow', WeatherState.sleet],
        ['rainsnowday', WeatherState.sleet],
        ['rainsnownight', WeatherState.sleet],
        ['ts', WeatherState.thunderstorms],
        ['tstorm', WeatherState.thunderstorms],
        ['tsrrain', WeatherState.thunderstorms],
        ['???', WeatherState.unknown]
    ])('map weather %s to domain %s', (weatherFrom7timer: string, weatherState: WeatherState) => {
        // Given
        const weatherFromApi: DailyWeather7Timer = {
            dataseries: [
                { weather: weatherFrom7timer, date: '20201213', temp2m: { max: 12, min: 9 }, wind10m_max: 5 }
            ]
        }

        // When
        const weather = WeatherMapper.toDailyDomain(weatherFromApi)

        // Then
        expect(weather[0].weather).toBe(weatherState)
    })
})
