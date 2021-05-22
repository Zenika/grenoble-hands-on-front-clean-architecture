import { GetBookmarkCityPresentation, GetBookmarkCityUseCase } from '@grenoble-hands-on/domain'

export class GetBookmarkCityUseCaseBuilder {
    private execute: (presentation: GetBookmarkCityPresentation) => void = () => null

    withExecute(execute: (presentation: GetBookmarkCityPresentation) => void) {
        this.execute = execute
        return this
    }

    build(): GetBookmarkCityUseCase {
        return {
            execute: this.execute,
        } as GetBookmarkCityUseCase
    }
}
