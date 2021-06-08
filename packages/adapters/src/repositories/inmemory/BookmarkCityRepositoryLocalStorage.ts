import { BookmarkRepository } from '@grenoble-hands-on/domain'

const key = "FAVORITE_CITY"

export class BookmarkCityRepositoryLocalStorage implements BookmarkRepository {
    constructor(private readonly storage: Storage) {
    }

    getBookmarkCity(): Promise<string | null> {
        return Promise.resolve(this.storage.getItem(key));
    }

    bookmarkCity(city: string): Promise<boolean> {
        const bookmarkedCity = this.storage.getItem(key)
        if (bookmarkedCity === city) {
            this.storage.removeItem(key)
            return Promise.resolve(false);
        } else {
            this.storage.setItem(key, city)
            return Promise.resolve(true);
        }
    }


}
