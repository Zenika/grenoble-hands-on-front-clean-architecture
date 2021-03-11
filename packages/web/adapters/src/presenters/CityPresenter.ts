import { Presenter } from './Presenter'
import {
    City,
    DailyWeather,
    GetCityPresentationBuilder,
    GetCityRequest,
    GetCityUseCase,
    HourlyWeather,
    RetrieveCityDailyWeatherUseCase,
    RetrieveCityHourlyWeatherUseCase,
    RetrieveDailyWeatherPresentationBuilder,
    RetrieveHourlyWeatherPresentationBuilder,
    RetrieveWeatherRequest
} from '@grenoble-hands-on/domain'

export class CityPresenterVM {
    city: City | undefined
    dailyWeather: DailyWeather[] | undefined
    hourlyWeather: HourlyWeather[] | undefined
    loading = false
    temperatureUnite: 'C' | 'F' = 'C'
    mode: 'hourly' | 'daily' = 'daily'
}


export class CityPresenter extends Presenter<CityPresenterVM> {

    constructor(private cityId: string,
                private getCityUseCase: GetCityUseCase,
                private retrieveCityWeatherUseCase: RetrieveCityDailyWeatherUseCase,
                private retrieveCityHourlyWeatherUseCase: RetrieveCityHourlyWeatherUseCase) {
        super(new CityPresenterVM())
    }

    async fetchCity() {
        const presenter = new GetCityPresentationBuilder()
            .withDisplayCity(city => {
                this.vm.city = city
                this.updateVM()
            })
            .build()
        await this.getCityUseCase.execute(new GetCityRequest(this.cityId), presenter)
    }

    async fetchWeather() {
        this.vm.loading = true
        this.vm.hourlyWeather = undefined
        this.vm.dailyWeather = undefined
        this.updateVM()
        if (this.vm.mode == 'daily') {
            await this.fetchDailyWeather()
        } else {
            await this.fetchHourlyWeather()
        }
    }

    updateTemperatureUnite(temperatureUnite: 'C' | 'F') {
        this.vm.temperatureUnite = temperatureUnite
        this.fetchWeather()
    }

    updateMode(mode: 'hourly' | 'daily') {
        this.vm.mode = mode
        this.fetchWeather()
    }

    private async fetchHourlyWeather() {
        const presenter = new RetrieveHourlyWeatherPresentationBuilder()
            .withDisplayWeather((weather: HourlyWeather[]) => {
                this.vm.hourlyWeather = weather
                this.vm.loading = false
                this.updateVM()
            })
            .build()
        await this.retrieveCityHourlyWeatherUseCase.execute(new RetrieveWeatherRequest(this.cityId, this.vm.temperatureUnite), presenter)
    }

    private async fetchDailyWeather() {
        const presenter = new RetrieveDailyWeatherPresentationBuilder()
            .withDisplayWeather((weather: DailyWeather[]) => {
                this.vm.dailyWeather = weather
                this.vm.loading = false
                this.updateVM()
            })
            .build()
        await this.retrieveCityWeatherUseCase.execute(new RetrieveWeatherRequest(this.cityId, this.vm.temperatureUnite), presenter)
    }
}
