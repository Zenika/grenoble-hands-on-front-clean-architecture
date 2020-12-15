import {HttpClient, WeatherRepositoryHttp} from "../../../src";
import { Weather7Timer } from "../../../src/repositories/http/dto/Weather7Timer";

describe('WeatherRepository HTTP', () => {
    test('get week weather', async () => {
        const position = {latitude: 45, longitude: 5};
        const httpClient: Partial<HttpClient> = {
            get(url: string): Promise<any> {
                expect(url).toBe(`http://www.7timer.info/bin/api.pl?lon=${position.longitude}&lat=${position.latitude}&product=civillight&output=json`)
                const response: Weather7Timer = {
                    dataseries: [{weather: 'cloud', date: '20201213', temp2m: {max: 12, min: 9}, wind10m_max: 5}]
                };
                return Promise.resolve(response)
            }
        };
        const repository = new WeatherRepositoryHttp(httpClient as HttpClient);

        // When
        const weathers = await repository.getWeekWeather(position);

        // Then
        expect(weathers).toHaveLength(1)
    });
});
