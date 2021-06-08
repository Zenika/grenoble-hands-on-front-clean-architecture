import { BookmarkCityPresentation, BookmarkCityRequest, BookmarkCityUseCase } from '@grenoble-hands-on/domain'

export class BookmarkCityUseCaseBuilder {
    private execute: (request: BookmarkCityRequest, presentation: BookmarkCityPresentation) => void = () => null;

    withExecute(execute: (request: BookmarkCityRequest, presentation: BookmarkCityPresentation) => void) {
        this.execute = execute;
        return this;
    }

    build(): BookmarkCityUseCase {
        return {
            execute: this.execute,
        } as BookmarkCityUseCase
    }
}
