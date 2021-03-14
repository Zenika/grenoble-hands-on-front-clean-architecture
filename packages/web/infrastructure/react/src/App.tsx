import React from 'react'
import './App.css'
import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom'
import Cities from './Cities'

function App() {
    return (
        <BrowserRouter>
            <section className="section">
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <Cities/>
                        </Route>
                    </Switch>
                </div>
            </section>
        </BrowserRouter>
    )
}

export default App
