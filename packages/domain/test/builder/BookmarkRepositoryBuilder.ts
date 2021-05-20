import { BookmarkRepository } from '@grenoble-hands-on/domain'

export class BookmarkRepositoryBuilder {
    private bookmarkCity: (city: string) => Promise<boolean> = () => Promise.resolve(false)

    withBookmarkCity(bookmarkCity: (city: string) => Promise<boolean>) {
        this.bookmarkCity = bookmarkCity
        return this
    }

    build(): BookmarkRepository {
        return {
            bookmarkCity: this.bookmarkCity
        }
    }
}
