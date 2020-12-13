import {DailyWeather} from "../../entities/DailyWeather";

export interface RetrieveWeatherPresenter {
    displayWeather(weather: DailyWeather[]): void
    displayStartLoading(): void
    displayFinishLoading(): void
}
