import { GetCitiesUseCase } from '@grenoble-hands-on/domain'
import { GetCitiesPresentation } from '@grenoble-hands-on/domain'

export class GetCitiesUseCaseBuilder {
    private execute: (presenter: GetCitiesPresentation) => Promise<void> = () => Promise.resolve();

    withExecute(execute: (presenter: GetCitiesPresentation) => Promise<void>) {
        this.execute = execute;
        return this;
    }

    build(): GetCitiesUseCase {
        return {execute: this.execute} as GetCitiesUseCase
    }
}
