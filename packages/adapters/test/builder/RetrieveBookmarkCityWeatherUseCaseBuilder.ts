import { RetrieveBookmarkCityWeatherPresentation, RetrieveBookmarkCityWeatherUseCase } from '@grenoble-hands-on/domain'

export class RetrieveBookmarkCityWeatherUseCaseBuilder {
    private execute: (presenter: RetrieveBookmarkCityWeatherPresentation) => void = () => null

    withExecute(execute: (presenter: RetrieveBookmarkCityWeatherPresentation) => void) {
        this.execute = execute
        return this
    }

    build(): RetrieveBookmarkCityWeatherUseCase {
        return { execute: this.execute } as RetrieveBookmarkCityWeatherUseCase
    }
}
