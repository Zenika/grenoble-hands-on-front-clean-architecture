import { DailyWeather, HourlyWeather } from '@grenoble-hands-on/domain'
import { DailyWeather7Timer } from '../dto/DailyWeather7Timer'
import { HourlyWeather7Timer } from '../dto/HourlyWeather7Timer'

export class WeatherMapper {
    static toDailyDomain(weather: DailyWeather7Timer): DailyWeather[] {
        return weather.dataseries.map(serie => {
            return {
                day: this.formatDate(this.parseDate(serie.date.toString())),
                temperatureMax: serie.temp2m.max,
                temperatureMin: serie.temp2m.min,
                weather: serie.weather
            };
        })
    }

    static toHourlyDomain(weather: HourlyWeather7Timer): HourlyWeather[] {
        const date = this.parseTime(weather.init)
        return weather.dataseries.map(serie => {
            const time = new Date(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours()+serie.timepoint)
            return {
                time: this.formatTime(time),
                temperature: serie.temp2m,
                weather: serie.weather
            };
        })
    }

    private static formatDate(date: Date) {
        const day = ('0' + date.getDate()).slice(-2)
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    private static formatTime(date: Date) {
        const minutes = ('0' + date.getMinutes()).slice(-2)
        const hour = ('0' + date.getHours()).slice(-2)
        return `${hour}:${minutes}`
    }

    private static parseDate(date: string) {
        return new Date(+date.substring(0, 4), +date.substring(4, 6) - 1, +date.substring(6))
    }

    private static parseTime(date: string) {
        return new Date(+date.substring(0, 4), +date.substring(4, 6) - 1, +date.substring(6, 8) - 1, +date.substring(8))
    }
}
