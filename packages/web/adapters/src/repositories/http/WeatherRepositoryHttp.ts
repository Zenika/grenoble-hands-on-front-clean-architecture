import {WeatherRepository} from "@grenoble-hands-on/domain/src/ports/repositories/WeatherRepository";
import {GeoPosition} from "@grenoble-hands-on/domain/src/entities/GeoPosition";
import {DailyWeather} from "@grenoble-hands-on/domain/src/entities/DailyWeather";
import {WeatherMapper} from "./mapper/WeatherMapper";
import {Weather7Timer} from "./dto/Weather7Timer";

export interface HttpClient {
    get<T>(url: string): Promise<T>
}

export class WeatherRepositoryHttp implements WeatherRepository {

    private BASE_URL = `http://www.7timer.info/bin/api.pl`;

    constructor(private http: HttpClient) {
    }

    getWeekWeather(geoPosition: GeoPosition): Promise<DailyWeather[]> {
        return this.http.get<Weather7Timer>(`${this.BASE_URL}?lon=${geoPosition.longitude}&lat=${geoPosition.latitude}&product=civillight&output=json`)
            .then((res) => WeatherMapper.toDomain(res))
    }

}
