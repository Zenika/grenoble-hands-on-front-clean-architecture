import { CityBuilder, CityRepositoryBuilder } from '@grenoble-hands-on/domain'
import { HttpClient, Weather7Timer, WeatherRepository7Timer } from '@grenoble-hands-on/web-adapters'

describe('WeatherRepository HTTP', () => {
    test('get week weather', async () => {
        // Given
        const city = CityBuilder.example().build()
        const httpClient: HttpClient = {
            get(url: string): Promise<any> {
                expect(url).toBe(`http://www.7timer.info/bin/api.pl?lon=${city.position.longitude}&lat=${city.position.latitude}&product=civillight&output=json`)
                const response: Weather7Timer = {
                    dataseries: [{ weather: 'cloud', date: '20201213', temp2m: { max: 12, min: 9 }, wind10m_max: 5 }]
                }
                return Promise.resolve(response)
            }
        } as HttpClient
        const cityRepository = new CityRepositoryBuilder().withGetCity((_) => Promise.resolve(city)).build()
        const repository = new WeatherRepository7Timer(httpClient, cityRepository)

        // When
        const weathers = await repository.getCityWeekWeather('Grenoble')

        // Then
        expect(weathers).toHaveLength(1)
    })
})
