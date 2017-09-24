import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import Booking from './component/booking/Booking'
import Promotion from './component/promotion/Promotion'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Booking</Link></li>
        <li><Link to='/promotion'>Promotion</Link></li>
      </ul>
    </nav>
  </header>
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
