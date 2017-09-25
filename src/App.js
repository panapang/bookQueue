import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Nav, NavItem } from 'react-bootstrap';

import Booking from './components/Booking'
import Promotion from './components/Promotion'

const Header = () => (
  <Nav bsStyle="pills" justified>
    <NavItem eventKey={1} href="/">Booking</NavItem>
    <NavItem eventKey={2} href="/promotion">Promotion</NavItem>
  </Nav>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Booking} />
      <Route exact path='/promotion' component={Promotion} />
    </Switch>
  </main>
)

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
