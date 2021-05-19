import { RetrieveCityDailyWeatherUseCase, RetrieveDailyWeatherPresentation, RetrieveWeatherRequest } from '@grenoble-hands-on/domain'

export class RetrieveCityDailyWeatherUseCaseBuilder {
    private execute: (request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => void = () => null;

    withExecute(execute: (request: RetrieveWeatherRequest, presenter: RetrieveDailyWeatherPresentation) => void) {
        this.execute = execute;
        return this;
    }

    build(): RetrieveCityDailyWeatherUseCase {
        return {execute: this.execute} as RetrieveCityDailyWeatherUseCase
    }
}
