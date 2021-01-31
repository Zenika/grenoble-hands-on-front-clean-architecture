import { RetrieveCityHourlyWeatherUseCase, RetrieveHourlyWeatherPresentation, RetrieveWeatherRequest } from '@grenoble-hands-on/domain'

export class RetrieveCityHourlyWeatherUseCaseBuilder {
    private execute: (request: RetrieveWeatherRequest, presenter: RetrieveHourlyWeatherPresentation) => void = () => null

    withExecute(execute: (request: RetrieveWeatherRequest, presenter: RetrieveHourlyWeatherPresentation) => void) {
        this.execute = execute
        return this
    }

    build(): RetrieveCityHourlyWeatherUseCase {
        return { execute: this.execute } as RetrieveCityHourlyWeatherUseCase
    }
}
