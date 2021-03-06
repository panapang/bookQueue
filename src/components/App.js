import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';

import Reservation from './Reservation/Reservation';
import Bill from './Bill/Bill';
import Promotion from '../containers/Promotion';
import PromotionEdit from '../containers/PromotionEdit';

import './App.css';

const Header = () => (
  <Nav bsStyle="pills" justified>
    <NavItem eventKey={1} href="/">Reservation</NavItem>
    <NavItem eventKey={2} href="/bill">Bill</NavItem>
    <NavItem eventKey={3} href="/promotions">Manage Promotions</NavItem>
  </Nav>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Reservation} />
      <Route exact path="/bill" component={Bill} />
      <Route exact path="/promotions" component={Promotion} />
      <Route path="/promotions/:_id" component={PromotionEdit} />
      <Route exact path="/createpromotion" component={PromotionEdit} />
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
