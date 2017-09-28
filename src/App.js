import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col, Grid, Nav, NavItem, Row } from 'react-bootstrap';

import Booking from './components/Booking';
import ListPromotion from './components/ListPromotion';
import PromotionPage from './components/PromotionPage';
import NewPromotionPage from './components/NewPromotionPage';

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
