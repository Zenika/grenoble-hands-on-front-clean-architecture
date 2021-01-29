import { DailyWeather } from '@grenoble-hands-on/domain'
import { Weather7Timer } from '../dto/Weather7Timer'

export class WeatherMapper {
    static toDomain(weather: Weather7Timer): DailyWeather[] {
        return weather.dataseries.map(serie => {
            return {
                day: this.parseDate(serie.date.toString()),
                temperatureMax: serie.temp2m.max,
                temperatureMin: serie.temp2m.min,
                weather: serie.weather
            };
        })
    }

    private static parseDate(date: string) {
        return `${date.substring(6)}/${date.substring(4, 6)}/${date.substring(0, 4)}`
    }
}
