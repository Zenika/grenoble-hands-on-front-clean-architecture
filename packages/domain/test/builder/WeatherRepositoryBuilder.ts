import { DailyWeather, HourlyWeather, WeatherRepository } from '@grenoble-hands-on/domain'

export class WeatherRepositoryBuilder {
    private getCityDailyWeather: (city: string) => Promise<DailyWeather[]> = () => Promise.resolve([])
    private getCityHourlyWeather: (city: string) => Promise<HourlyWeather[]> = () => Promise.resolve([])

    withGetCityDailyWeather(getCityDailyWeather: (city: string) => Promise<DailyWeather[]>) {
        this.getCityDailyWeather = getCityDailyWeather
        return this
    }

    withGetCityHourlyWeather(getCityHourlyWeather: (_: any) => Promise<HourlyWeather[]>) {
        this.getCityHourlyWeather = getCityHourlyWeather
        return this
    }


    build(): WeatherRepository {
        return {
            getCityDailyWeather: this.getCityDailyWeather,
            getCityHourlyWeather: this.getCityHourlyWeather,
        }
    }
}
