import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory, IndexRoute } from 'react-router'
import Navbar from './modules/Navbar'
import Home from './modules/Home'
import Joinus from './modules/Joinus'
import Guideline from './modules/Guideline'
import Components from './modules/Components'

render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={Navbar}>
      <IndexRoute component={Home}/>      
      <Route path="product">
        <IndexRedirect to="sc-guideline"/>
        <Route path=":gdlName">
          <IndexRedirect to="about"/>
          <Route path=":compName" component={Guideline}/>
        </Route>
      </Route>

      <Route path="components" component={Components}/>
      
      <Route path="branding">
          <IndexRedirect to="logo"/>
          <Route path=":compName" component={Guideline}/>
      </Route>
      <Route path="join-us" component={Joinus}/>

    </Route>
    <Route path="test/:compName" component={Components}/>
 
  </Router>
), document.getElementById('app'))
