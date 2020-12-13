import {GeoPosition} from "../../entities/GeoPosition";
import {DailyWeather} from "../../entities/DailyWeather";

export interface WeatherRepository {
    getWeekWeather(geoPosition: GeoPosition): Promise<DailyWeather[]>
}
