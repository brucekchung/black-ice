import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../Login/Login'
import DataEntry from '../DataEntry/DataEntry'
import Reports from '../Reports/Reports'
import Landing from '../Landing/Landing'
import ViewAll from '../ViewAll/ViewAll'

const Main = () => (
  <Switch>
    <Route exact path='/' render={ () => <Login /> } /> 
    <Route exact path='/DataEntry' render={ () => <DataEntry /> } /> 
    <Route exact path='/Reports' render={ () => <Reports /> } /> 
    <Route exact path='/Landing' render={ () => <Landing /> } /> 
    <Route exact path='/ViewAll' render={ () => <ViewAll /> } /> 
  </Switch>
)

export default Main
