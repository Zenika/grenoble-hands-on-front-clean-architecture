import { GetBookmarkCityPresentation } from '@grenoble-hands-on/domain'

export class GetBookmarkCityPresentationBuilder {
    private notifyCityBookmarked: (city: string) => void = () => null

    withNotifyCityBookmarked(notifyCityBookmarked: (city: string) => void) {
        this.notifyCityBookmarked = notifyCityBookmarked
        return this
    }

    build(): GetBookmarkCityPresentation {
        return {
            notifyCityBookmarked: this.notifyCityBookmarked,
        }
    }
}
