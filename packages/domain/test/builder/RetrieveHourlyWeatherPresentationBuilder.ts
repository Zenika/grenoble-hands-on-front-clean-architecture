import { HourlyWeather, RetrieveHourlyWeatherPresentation } from '@grenoble-hands-on/domain'

export class RetrieveHourlyWeatherPresentationBuilder {
    private displayLoadingWeather: () => void = () => null;
    private displayWeather: (weather: HourlyWeather[]) => void = () => null;

    constructor() {
    }

    withDisplayWeather(displayWeather: (weather: HourlyWeather[]) => void) {
        this.displayWeather = displayWeather;
        return this;
    }

    build(): RetrieveHourlyWeatherPresentation {
        return {
            displayLoadingWeather: this.displayLoadingWeather,
            displayHourlyWeather: this.displayWeather,
        }
    }
}
