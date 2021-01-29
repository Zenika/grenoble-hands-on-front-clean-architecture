import { DailyWeather, RetrieveWeatherPresentation } from '@grenoble-hands-on/domain'

export class RetrieveWeatherPresentationBuilder {
    private displayWeather: (weather: DailyWeather[]) => void = () => null;
    private displayStartLoading: () => void = () => null;
    private displayFinishLoading: () => void = () => null;

    withDisplayWeather(displayWeather: (weather: DailyWeather[]) => void) {
        this.displayWeather = displayWeather;
        return this;
    }

    withDisplayStartLoading(displayStartLoading: () => void) {
        this.displayStartLoading = displayStartLoading;
        return this;
    }

    withDisplayFinishLoading(displayFinishLoading: () => void) {
        this.displayFinishLoading = displayFinishLoading;
        return this;
    }

    build(): RetrieveWeatherPresentation {
        return {
            displayWeather: this.displayWeather,
            displayStartLoading: this.displayStartLoading,
            displayFinishLoading: this.displayFinishLoading
        }
    }
}
