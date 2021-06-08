import { WeatherState } from './WeatherState'
import { DailyWeather } from './DailyWeather'

export class DailyWeatherBuilder {

    private day!: string
    private weather!: WeatherState
    private temperatureMax!: number
    private temperatureMin!: number

    withDay(day: string) {
        this.day = day
        return this;
    }

    withWeather(weather: WeatherState) {
        this.weather = weather
        return this;
    }

    withTemperatureMax(temperatureMax: number) {
        this.temperatureMax = temperatureMax
        return this;
    }

    withTemperatureMin(temperatureMin: number) {
        this.temperatureMin = temperatureMin
        return this;
    }

    build(): DailyWeather {
        return {
            type: 'daily',
            day: this.day,
            weather: this.weather,
            temperatureMax: this.temperatureMax,
            temperatureMin: this.temperatureMin,
            unite: 'C'
        }
    }

    static sunny() {
        return new DailyWeatherBuilder()
            .withDay("2021-06-08")
            .withWeather(WeatherState.sunny)
            .withTemperatureMax(25)
            .withTemperatureMin(12)
            .build()
    }

    static cloudy() {
        return new DailyWeatherBuilder()
            .withDay("2021-06-08")
            .withWeather(WeatherState.cloudy)
            .withTemperatureMax(18)
            .withTemperatureMin(12)
            .build()
    }
}
