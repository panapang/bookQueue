import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';

import Reservation from './Reservation/Reservation';
import Bill from './Bill/Bill';
import PromotionsList from './Promotion/PromotionsList';
import Promotion from '../containers/Promotion';
import PromotionPage from './Promotion/PromotionPage';
import NewPromotionPage from './Promotion/NewPromotionPage';

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
      <Route path="/promotions/:_id" component={PromotionPage} />
      <Route exact path="/createpromotion" component={NewPromotionPage} />
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
