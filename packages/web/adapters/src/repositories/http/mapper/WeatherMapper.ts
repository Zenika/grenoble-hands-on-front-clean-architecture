import {DailyWeather} from "@grenoble-hands-on/domain/src/entities/DailyWeather";
import {Weather7Timer} from "../dto/Weather7Timer";

export class WeatherMapper {
    static toDomain(weather: Weather7Timer): DailyWeather[] {
        return weather.dataseries.map(serie => {
            return {
                day: this.parseDate(serie.date),
                temperatureMax: serie.temp2m.max,
                temperatureMin: serie.temp2m.min,
                weather: serie.weather
            };
        })
    }

    private static parseDate(date: string) {
        return new Date(+date.substring(0, 4), (+date.substring(4, 6)) - 1, +date.substring(6), 0, 0);
    }
}
