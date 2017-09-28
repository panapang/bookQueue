import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';

import Reservation from './components/Reservation/Reservation';
import Bill from './components/Bill/Bill';
import ListPromotion from './components/Promotion/ListPromotion';
import PromotionPage from './components/Promotion/PromotionPage';
import NewPromotionPage from './components/Promotion/NewPromotionPage';

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
      <Route exact path="/promotions" component={ListPromotion} />
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
