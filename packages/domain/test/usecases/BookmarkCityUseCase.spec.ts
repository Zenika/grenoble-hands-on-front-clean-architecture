import { BookmarkCityRequest, BookmarkCityUseCase } from '@grenoble-hands-on/domain'
import { BookmarkRepositoryBuilder } from '../builder/BookmarkRepositoryBuilder'
import { BookmarkCityPresentationBuilder } from '../builder/BookmarkCityPresentationBuilder'

describe('Bookmark city use case', () => {

    test('notify city bookmarked when successful', () => {
        const cityToBookmark = 'GRENOBLE'
        return new Promise<string>(resolve => {
            // Given
            const repository = new BookmarkRepositoryBuilder()
                .withBookmarkCity((_) => Promise.resolve(true))
                .build()
            const useCase = new BookmarkCityUseCase(repository)
            const presentation = new BookmarkCityPresentationBuilder()
                .withNotifyCityBookmarked((city) => resolve(city))
                .build()

            // When
            useCase.execute(new BookmarkCityRequest(cityToBookmark), presentation)

        }).then(cityBookmarked => {
            // Then
            expect(cityBookmarked).toBe(cityToBookmark)
        })
    })

    test('notify city removed from bookmark when city already bookmarked', () => {
        const cityToBookmark = 'GRENOBLE'
        return new Promise<boolean>(resolve => {
            // Given
            const repository = new BookmarkRepositoryBuilder()
                .withBookmarkCity((_) => Promise.resolve(false))
                .build()
            const useCase = new BookmarkCityUseCase(repository)
            const presentation = new BookmarkCityPresentationBuilder()
                .withNotifyCityRemovedFromBookmark(() => resolve(true))
                .build()

            // When
            useCase.execute(new BookmarkCityRequest(cityToBookmark), presentation)

        }).then(cityRemovedFromBookmark => {
            // Then
            expect(cityRemovedFromBookmark).toBeTruthy()
        })
    })
})
