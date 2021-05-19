import { City } from '@grenoble-hands-on/domain'

export type NavigationRouteURL = string;

export class NavigationRoute {
    static HOME: NavigationRouteURL = '/';
    static CITIES: NavigationRouteURL = '/cities';
    static CITY(city: City): NavigationRouteURL { return `/city/${city.name}` }
}
