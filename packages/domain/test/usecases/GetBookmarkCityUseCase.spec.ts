import { BookmarkCityRequest, GetBookmarkCityUseCase } from '@grenoble-hands-on/domain'
import { BookmarkRepositoryBuilder } from '../builder/BookmarkRepositoryBuilder'
import { GetBookmarkCityPresentationBuilder } from '../builder/GetBookmarkCityPresentationBuilder'

describe('Get bookmark city use case', () => {

    test('notify city bookmarked when successful', () => {
        const cityBookmark = 'GRENOBLE'
        return new Promise<string>(resolve => {
            // Given
            const repository = new BookmarkRepositoryBuilder()
                .withGetBookmarkCity(() => Promise.resolve(cityBookmark))
                .build()
            const useCase = new GetBookmarkCityUseCase(repository)
            const presentation = new GetBookmarkCityPresentationBuilder()
                .withNotifyCityBookmarked((city) => resolve(city))
                .build()

            // When
            useCase.execute(presentation)

        }).then(cityBookmarked => {
            // Then
            expect(cityBookmarked).toBe(cityBookmark)
        })
    })
})
