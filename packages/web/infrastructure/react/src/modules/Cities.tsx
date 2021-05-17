import React, { Fragment, useEffect, useState } from 'react'
import { City } from '@grenoble-hands-on/domain'
import { Link } from 'react-router-dom'
import { CitiesControllerFactory } from '@grenoble-hands-on/web-adapters'

export function Cities(props: { citiesControllerFactory: CitiesControllerFactory }) {
    const controller = props.citiesControllerFactory.build()

    const [vm, setVm] = useState(controller.presenter.vm)

    useEffect(() => {
        controller.fetchCities()
        controller.presenter.subscribeVM((state) => {
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
