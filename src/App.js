import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';

import Booking from './components/Booking';
import Promotion from './components/Promotion';

import './App.css';

const Header = () => (
  <Nav bsStyle="pills" justified>
    <NavItem eventKey={1} href="/">Booking</NavItem>
    <NavItem eventKey={2} href="/promotions">Manage Promotions</NavItem>
  </Nav>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Booking} />
      <Route path="/promotions" component={Promotion} />
    </Switch>
  </main>
)

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Header />
            <Main />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
