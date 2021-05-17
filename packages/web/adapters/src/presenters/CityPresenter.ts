import { Presenter } from './Presenter'
import {
    City,
    DailyWeather,
    GetCityPresentation,
    HourlyWeather,
    RetrieveDailyWeatherPresentation,
    RetrieveHourlyWeatherPresentation
} from '@grenoble-hands-on/domain'

export class CityPresenterVM {
    city: City | undefined
    dailyWeather: DailyWeather[] | undefined
    hourlyWeather: HourlyWeather[] | undefined
    loading = false
    temperatureUnite: 'C' | 'F' = 'C'
    mode: 'hourly' | 'daily' = 'daily'
}


export class CityPresenter extends Presenter<CityPresenterVM> implements GetCityPresentation, RetrieveDailyWeatherPresentation, RetrieveHourlyWeatherPresentation {

    constructor() {
        super(new CityPresenterVM())
    }

    displayCity(city: City): void {
        this.vm.city = city
        this.notifyVM()
    }

    displayHourlyWeather(weather: HourlyWeather[]): void {
        this.vm.hourlyWeather = weather
        this.vm.loading = false
        this.notifyVM()
    }

    displayDailyWeather(weather: DailyWeather[]): void {
        this.vm.dailyWeather = weather
        this.vm.loading = false
        this.notifyVM()
    }
}
