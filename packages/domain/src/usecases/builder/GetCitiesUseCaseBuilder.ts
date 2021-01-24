import {GetCitiesUseCase} from "../GetCitiesUseCase";
import {GetCitiesPresentation} from "../../ports/presenters/GetCitiesPresentation";

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