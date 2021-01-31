import { CityBuilder, CityRepository } from '@grenoble-hands-on/domain'
import { HttpClient, DailyWeather7Timer, WeatherRepository7Timer } from '@grenoble-hands-on/web-adapters'
import { HourlyWeather7Timer } from '../../../src/repositories/http/dto/HourlyWeather7Timer'

describe('WeatherRepository HTTP', () => {
    test('get daily weather', async () => {
        // Given
        const city = CityBuilder.example().build()
        const httpClient: HttpClient = {
            get(url: string): Promise<any> {
                expect(url).toBe(`http://www.7timer.info/bin/api.pl?lon=${city.position.longitude}&lat=${city.position.latitude}&product=civillight&output=json`)
                const response: DailyWeather7Timer = {
                    dataseries: [{ weather: 'cloud', date: '20201213', temp2m: { max: 12, min: 9 }, wind10m_max: 5 }]
                }
                return Promise.resolve(response)
            }
        } as HttpClient
        const cityRepository: CityRepository = { getCity: (_: string) => Promise.resolve(city) } as CityRepository
        const repository = new WeatherRepository7Timer(httpClient, cityRepository)

        // When
        const weathers = await repository.getCityDailyWeather('Grenoble')

        // Then
        expect(weathers).toHaveLength(1)
        expect(weathers[0].day).toBe('13/12/2020')
        expect(weathers[0].temperatureMax).toBe(12)
        expect(weathers[0].temperatureMin).toBe(9)
        expect(weathers[0].weather).toBe('cloud')
    })


    test('get hourly weather', async () => {
        // Given
        const city = CityBuilder.example().build()
        const httpClient: HttpClient = {
            get(url: string): Promise<any> {
                expect(url).toBe(`http://www.7timer.info/bin/api.pl?lon=${city.position.longitude}&lat=${city.position.latitude}&product=civil&output=json`)
                const response: HourlyWeather7Timer = {
                    init: '2020121310',
                    dataseries: [{ weather: 'cloud', timepoint: 3, temp2m: 12 }]
                }
                return Promise.resolve(response)
            }
        } as HttpClient
        const cityRepository: CityRepository = { getCity: (_: string) => Promise.resolve(city) } as CityRepository
        const repository = new WeatherRepository7Timer(httpClient, cityRepository)

        // When
        const weathers = await repository.getCityHourlyWeather('Grenoble')

        // Then
        expect(weathers).toHaveLength(1)
        expect(weathers[0].time).toBe('13:00')
        expect(weathers[0].temperature).toBe(12)
        expect(weathers[0].weather).toBe('cloud')
    })
})
