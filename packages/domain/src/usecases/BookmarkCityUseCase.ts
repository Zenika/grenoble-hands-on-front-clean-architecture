import { BookmarkRepository } from '../ports/repositories/BookmarkRepository'
import { BookmarkCityRequest } from '../ports/request/BookmarkCityRequest'
import { BookmarkCityPresentation } from '../ports/presenters/BookmarkCityPresentation'

export class BookmarkCityUseCase {
    constructor(private readonly repository: BookmarkRepository) {

    }

    execute(request: BookmarkCityRequest, presentation: BookmarkCityPresentation) {
        this.repository.bookmarkCity(request.city)
            .then(cityHasBeenBookmarked => {
                if (cityHasBeenBookmarked) {
                    presentation.notifyCityBookmarked(request.city)
                } else {
                    presentation.notifyCityRemovedFromBookmark(request.city)
                }
            })
    }
}
