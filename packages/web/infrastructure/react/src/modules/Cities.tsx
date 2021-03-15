import React, { Fragment, useEffect, useState } from 'react'
import { City } from '@grenoble-hands-on/domain'
import { Link } from 'react-router-dom'
import { CitiesPresenterFactory } from '@grenoble-hands-on/web-adapters'

export function Cities(props: { citiesPresenterFactory: CitiesPresenterFactory }) {
    const citiesPresenter = props.citiesPresenterFactory.build()

    const [vm, setVm] = useState(citiesPresenter.vm)

    useEffect(() => {
        citiesPresenter.fetchCities().then()
        citiesPresenter.onVmUpdate((state) => {
            setVm({ ...state })
        })
    }, [])

    return (
        <Fragment>
            <h1 className="title">Offices</h1>
            <div className="panel">
                {vm.cities?.map((city: City) => (
                    <Link className="panel-block p-4" to={'/city/' + city.name} key={city.name}>
                        <h2 className="subtitle">{city.name}</h2>
                    </Link>
                ))}
            </div>
        </Fragment>
    )
}
