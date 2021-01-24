import {WeatherMapper} from "./mapper/WeatherMapper";
import {Weather7Timer} from "./dto/Weather7Timer";
import {CityRepository, DailyWeather, WeatherRepository} from "@grenoble-hands-on/domain";

export interface HttpClient {
    get<T>(url: string): Promise<T>
}

export class WeatherRepository7Timer implements WeatherRepository {

    private BASE_URL = `http://www.7timer.info/bin/api.pl`;

    constructor(private http: HttpClient, private cityRepository: CityRepository) {
    }

    getCityWeekWeather(cityId: string): Promise<DailyWeather[]> {
        return this.cityRepository.getCity(cityId)
            .then((city) => this.http.get<Weather7Timer>(`${this.BASE_URL}?lon=${city.position.longitude}&lat=${city.position.latitude}&product=civillight&output=json`))
            .then((res) => WeatherMapper.toDomain(res))
    }

}
