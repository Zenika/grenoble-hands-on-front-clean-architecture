import React from 'react'
import { City, CityBuilder } from '@grenoble-hands-on/domain'
import { Link } from 'react-router-dom'

function Cities() {
    const cities: City[] = [
        CityBuilder.example().build()
    ]
    return (
        <section>
            <h1 className="title">Offices</h1>
            <div className="panel">
                {cities.map((city: City) => (
                    <Link className="panel-block p-4" to={'/city/' + city.name}>
                        <h2 className="subtitle">{city.name}</h2>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Cities
