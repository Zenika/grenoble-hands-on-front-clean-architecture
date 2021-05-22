export interface BookmarkRepository {
    getBookmarkCity(): Promise<string | null>;
    bookmarkCity(city: string): Promise<boolean>
}
