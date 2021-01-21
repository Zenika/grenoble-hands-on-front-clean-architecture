import {NavigationRouteURL} from "./NavigationRoute";
import {Navigation} from "./Navigation";

export class FakeNavigation implements Navigation {

    constructor(public currentRoute = '') {
    }

    navigate(route: NavigationRouteURL): Promise<void> {
        this.currentRoute = route
        return Promise.resolve()
    }
}