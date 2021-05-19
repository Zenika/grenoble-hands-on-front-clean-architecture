import { GetCityPresentation, GetCityRequest, GetCityUseCase } from '@grenoble-hands-on/domain'

export class GetCityUseCaseBuilder {
    private execute: (request: GetCityRequest, presenter: GetCityPresentation) => void = () => null;

    withExecute(execute: (request: GetCityRequest, presenter: GetCityPresentation) => void) {
        this.execute = execute;
        return this;
    }

    build(): GetCityUseCase {
        return {execute: this.execute} as GetCityUseCase
    }
}
