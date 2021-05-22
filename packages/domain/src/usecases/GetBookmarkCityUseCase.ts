import { BookmarkRepository } from '../ports/repositories/BookmarkRepository'
import { GetBookmarkCityPresentation } from '../ports/presenters/GetBookmarkCityPresentation'

export class GetBookmarkCityUseCase {
    constructor(private readonly repository: BookmarkRepository) {

    }

    execute(presentation: GetBookmarkCityPresentation) {
        this.repository.getBookmarkCity()
            .then(cityBookmarked => {
                if (cityBookmarked) {
                    presentation.notifyCityBookmarked(cityBookmarked)
                }
            })
    }
}
