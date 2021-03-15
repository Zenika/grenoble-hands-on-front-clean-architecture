import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

test('App', () => {
    const history = createMemoryHistory()
    const route = '/some-route'
    history.push(route)
    render(
        <Router history={history}>
            <App/>
        </Router>
    )
})
