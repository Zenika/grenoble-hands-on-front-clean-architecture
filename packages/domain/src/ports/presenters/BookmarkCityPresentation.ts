export interface BookmarkCityPresentation {
    notifyCityBookmarked(city: string): void

    notifyCityRemovedFromBookmark(city: string): void
}
