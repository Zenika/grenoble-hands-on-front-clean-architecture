import { RetrieveCityWeatherUseCase, RetrieveWeatherPresentation, RetrieveWeatherRequest } from '@grenoble-hands-on/domain'

export class RetrieveCityWeatherUseCaseBuilder {
    private execute: (request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresentation) => void = () => null;

    withExecute(execute: (request: RetrieveWeatherRequest, presenter: RetrieveWeatherPresentation) => void) {
        this.execute = execute;
        return this;
    }

    build(): RetrieveCityWeatherUseCase {
        return {execute: this.execute} as RetrieveCityWeatherUseCase
    }
}
