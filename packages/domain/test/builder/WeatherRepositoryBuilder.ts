import { DailyWeather, WeatherRepository } from '@grenoble-hands-on/domain'

export class WeatherRepositoryBuilder {
    private getCityWeekWeather: (city: string) => Promise<DailyWeather[]> = () => Promise.resolve([]);

    withGetCityWeekWeather(getCityWeekWeather: (city: string) => Promise<DailyWeather[]>) {
        this.getCityWeekWeather = getCityWeekWeather
        return this
    }


    build(): WeatherRepository {
        return {
            getCityWeekWeather: this.getCityWeekWeather,
        }
    }
}
