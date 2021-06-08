import { BookmarkRepository } from '@grenoble-hands-on/domain'

export class BookmarkRepositoryBuilder {
    private bookmarkCity: (city: string) => Promise<boolean> = () => Promise.resolve(false)
    private getBookmarkCity: () => Promise<string | null> = () => Promise.resolve(null)

    withBookmarkCity(bookmarkCity: (city: string) => Promise<boolean>) {
        this.bookmarkCity = bookmarkCity
        return this
    }

    withGetBookmarkCity(getBookmarkCity: () => Promise<string | null>) {
        this.getBookmarkCity = getBookmarkCity
        return this
    }

    build(): BookmarkRepository {
        return {
            getBookmarkCity: this.getBookmarkCity,
            bookmarkCity: this.bookmarkCity
        }
    }
}
