export interface BookmarkCityPresentation {
    notifyCityBookmarked(city: string): void

    notifyCityRemovedFromBookmark(): void
}
