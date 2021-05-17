import { DailyWeather, HourlyWeather, WeatherState } from '@grenoble-hands-on/domain'
import { DailyWeather7Timer } from '../dto/DailyWeather7Timer'
import { HourlyWeather7Timer } from '../dto/HourlyWeather7Timer'

export class WeatherMapper {
    static toDailyDomain(weather: DailyWeather7Timer): DailyWeather[] {
        return weather.dataseries.map(serie => {
            return {
                type: 'daily',
                day: this.formatDate(this.parseDate(serie.date.toString())),
                temperatureMax: serie.temp2m.max,
                temperatureMin: serie.temp2m.min,
                weather: this.getWeatherState(serie.weather),
                unite: 'C'
            }
        })
    }

    static toHourlyDomain(weather: HourlyWeather7Timer): HourlyWeather[] {
        const date = this.parseTime(weather.init)
        return weather.dataseries.map(serie => {
            const time = new Date(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours() + serie.timepoint)
            return {
                type: 'hourly',
                time: this.formatTime(time),
                temperature: serie.temp2m,
                weather: this.getWeatherState(serie.weather),
                unite: 'C'
            }
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

    private static getWeatherState(weather: string): WeatherState {
        switch (weather) {
            case 'clear':
            case 'clearday':
            case 'clearnight':
                return WeatherState.sunny
            case 'pcloudy':
            case 'pcloudyday':
            case 'pcloudynight':
            case 'windy':
            case 'windyday':
            case 'windynight':
                return WeatherState.partly_cloudy
            case 'mcloudy':
            case 'mcloudynight':
            case 'mcloudyday':
                return WeatherState.cloudy_s_sunny
            case 'cloudy':
            case 'cloudyday':
            case 'cloudynight':
                return WeatherState.cloudy
            case 'fog':
            case 'fogday':
            case 'fognight':
            case 'humidnight':
            case 'humidday':
                return WeatherState.fog
            case 'lightrain':
            case 'lightrainday':
            case 'lightrainnight':
            case 'rain':
            case 'rainday':
            case 'rainnight':
                return WeatherState.rain
            case 'oshower':
            case 'oshowerday':
            case 'oshowernight':
                return WeatherState.rain_s_sunny
            case 'ishower':
            case 'ishowerday':
            case 'ishowernight':
                return WeatherState.sunny_s_rain
            case 'lightsnow':
            case 'lightsnowday':
            case 'lightsnownight':
                return WeatherState.snow_light
            case 'snow':
            case 'snowday':
            case 'snownight':
                return WeatherState.snow
            case 'rainsnow':
            case 'rainsnowday':
            case 'rainsnownight':
                return WeatherState.sleet
            case 'ts':
            case 'tstorm':
            case 'tsrrain':
                return WeatherState.thunderstorms
            default:
                console.debug('unknown state : ' + weather)
                return WeatherState.unknown
        }
    }
}
