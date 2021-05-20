export interface BookmarkRepository {
    bookmarkCity(city: string): Promise<boolean>
}
