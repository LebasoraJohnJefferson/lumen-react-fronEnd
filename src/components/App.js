import Home from './Home'
import Login from './Login'
import Chat from './Chat'
import Register from './Register'
import React from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'

const App=()=> {
    
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route path='/Login'>
                    <Login />
                </Route>
                <Route path='/Register'>
                    <Register />
                </Route>
                <Route path='/Chat'>
                    <Chat/>
                </Route>
                <Route path='*'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
