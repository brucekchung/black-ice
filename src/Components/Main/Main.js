import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../Login/Login'
const Main = () => (
  <Switch>
    <Route exact path='/' render={ () => <Login /> } /> 
  </Switch>
)

export default Main
