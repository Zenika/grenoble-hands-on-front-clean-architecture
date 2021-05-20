import { DailyWeather, RetrieveDailyWeatherPresentation } from '@grenoble-hands-on/domain'

export class RetrieveDailyWeatherPresentationBuilder {
    private displayLoadingWeather: () => void = () => null;
    private displayWeather: (weather: DailyWeather[]) => void = () => null;

    constructor() {
    }

    withDisplayWeather(displayWeather: (weather: DailyWeather[]) => void) {
        this.displayWeather = displayWeather;
        return this;
    }

    build(): RetrieveDailyWeatherPresentation {
        return {
            displayLoadingWeather: this.displayLoadingWeather,
            displayDailyWeather: this.displayWeather,
        }
    }
}
