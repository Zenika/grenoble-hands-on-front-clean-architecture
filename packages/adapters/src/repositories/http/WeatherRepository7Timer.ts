import { WeatherMapper } from './mapper/WeatherMapper'
import { DailyWeather7Timer } from './dto/DailyWeather7Timer'
import { CityRepository, DailyWeather, HourlyWeather, WeatherRepository } from '@grenoble-hands-on/domain'
import { HourlyWeather7Timer } from './dto/HourlyWeather7Timer'
import { HttpClient } from './HttpClient'

export class WeatherRepository7Timer implements WeatherRepository {

    private BASE_URL = `http://www.7timer.info/bin/api.pl`;

    constructor(private http: HttpClient, private cityRepository: CityRepository) {
    }

    getCityDailyWeather(cityId: string): Promise<DailyWeather[]> {
        return this.cityRepository.getCity(cityId)
            .then((city) => this.http.get<DailyWeather7Timer>(`${this.BASE_URL}?lon=${city.position.longitude}&lat=${city.position.latitude}&product=civillight&output=json`))
            .then((res) => WeatherMapper.toDailyDomain(res))
    }

    getCityHourlyWeather(cityId: string): Promise<HourlyWeather[]> {
        return this.cityRepository.getCity(cityId)
                   .then((city) => this.http.get<HourlyWeather7Timer>(`${this.BASE_URL}?lon=${city.position.longitude}&lat=${city.position.latitude}&product=civil&output=json`))
                   .then((res) => WeatherMapper.toHourlyDomain(res))
    }

}
