import {WeatherRepository} from "@grenoble-hands-on/domain/src/ports/repositories/WeatherRepository";
import {GeoPosition} from "@grenoble-hands-on/domain/src/entities/GeoPosition";
import {DailyWeather} from "@grenoble-hands-on/domain/src/entities/DailyWeather";

interface HttpClient {
    get<T>(url: string): Promise<T>
}

interface Weather7Timer {
    date: string
    temp2m: { max: number, min: number }
    weather: string
    wind10m_max: number
}

export class WeatherMapper {
    static toEntity(weather: Weather7Timer): DailyWeather {
        return {
            day: new Date(),
            temperatureMax: weather.temp2m.max,
            temperatureMin: weather.temp2m.min,
            weather: weather.weather
        }
    }
}

export class WeatherRepositoryHttp implements WeatherRepository {

    constructor(private http: HttpClient) {}

    getWeekWeather(geoPosition: GeoPosition): Promise<DailyWeather[]> {
        return this.http.get<Weather7Timer[]>("/mon/api").then((res) => res.map(weather => WeatherMapper.toEntity(weather)))
    }

}
