import { BookmarkCityPresentation } from '@grenoble-hands-on/domain'

export class BookmarkCityPresentationBuilder {
    private notifyCityBookmarked: (city: string) => void = () => null
    private notifyCityRemovedFromBookmark: () => void = () => null

    withNotifyCityBookmarked(notifyCityBookmarked: (city: string) => void) {
        this.notifyCityBookmarked = notifyCityBookmarked
        return this
    }

    withNotifyCityRemovedFromBookmark(notifyCityRemovedFromBookmark: () => void) {
        this.notifyCityRemovedFromBookmark = notifyCityRemovedFromBookmark
        return this
    }

    build(): BookmarkCityPresentation {
        return {
            notifyCityBookmarked: this.notifyCityBookmarked,
            notifyCityRemovedFromBookmark: this.notifyCityRemovedFromBookmark
        }
    }
}
