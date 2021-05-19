import { Presenter } from './Presenter'
import {
    City,
    DailyWeather,
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


export class CityPresenter extends Presenter<CityPresenterVM> implements RetrieveDailyWeatherPresentation, RetrieveHourlyWeatherPresentation {

    constructor() {
        super(new CityPresenterVM())
    }

    displayCity(city: City): void {
        this.vm.city = city
        this.notifyVM()
    }

    displayLoadingWeather() {
        this.vm.loading = true
        this.vm.hourlyWeather = undefined
        this.vm.dailyWeather = undefined
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
