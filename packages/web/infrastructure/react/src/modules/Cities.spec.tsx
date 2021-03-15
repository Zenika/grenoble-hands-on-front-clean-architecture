import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CitiesPresenterBuilder, CitiesPresenterFactory, CitiesPresenterVM } from '@grenoble-hands-on/web-adapters'
import { CityBuilder } from '@grenoble-hands-on/domain'
import { Cities } from './Cities'

describe('CitiesComponent', () => {

  it('display cities', () => {
    // Given
    const vm = new CitiesPresenterVM()
    vm.cities = [
      CityBuilder.example().withName('Grenoble').build(),
      CityBuilder.example().withName('Lyon').build()
    ]
    const presenter = new CitiesPresenterBuilder(vm).build()
    const presenterFactory = { build: () => presenter } as CitiesPresenterFactory

    // When
    render(<Cities citiesPresenterFactory={presenterFactory} />, { wrapper: MemoryRouter });

    // Then
    const citiesName = screen.getAllByRole('link').map(el => el.textContent)
    expect(citiesName).toEqual(['Grenoble', 'Lyon'])
  })

  it('fetch cities on init', async () => {
    const hasFetch = await new Promise<boolean>(resolve => {
      // Given
      const presenter = new CitiesPresenterBuilder()
          .withFetchCities(() => {
            resolve(true)
            return Promise.resolve()
          })
          .build()
      const presenterFactory = { build: () => presenter } as CitiesPresenterFactory

      // When
      render(<Cities citiesPresenterFactory={presenterFactory} />, { wrapper: MemoryRouter });

    })

    // Then
    expect(hasFetch).toBeTruthy()
  })
})
