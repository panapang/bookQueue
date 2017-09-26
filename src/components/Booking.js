import React from 'react';
import { Button, Col, ControlLabel, FormGroup, FormControl, Panel, Row } from 'react-bootstrap';
import PromotionChooser from './PromotionChooser';

import restaurant from '../data/restaurant';
import promotions from '../data/promotions';

class Booking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfGuests: 0,
      selectedPromotion: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePromotionChange = this.handlePromotionChange.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.calculateBill();
  }

  handlePromotionChange(selectedPromotion) {
    this.setState({ selectedPromotion: selectedPromotion });
  }

  calculateBill() {
    const numberOfGuests = this.state.numberOfGuests;
    const selectedPromotion = this.state.selectedPromotion;

    let promotionCanUse = promotions
      .filter(promotion =>
        eval(
          (this.isInPromotion(selectedPromotion, promotion.id) &&
            this.validateMinCustomer(promotion.minCust, numberOfGuests) &&
            this.validateMaxCustomer(promotion.maxCust, numberOfGuests))
           + (promotion.operatorWithPrice === 'or'?  ' || ':' && ') +
          this.validateMoreThanPrice(promotion.priceMoreThan, restaurant.price, numberOfGuests)
        )
      );

    console.log(promotionCanUse);
  }

  isInPromotion(selectedPromotion, id) {
    return selectedPromotion.includes(id);
  }

  validateMinCustomer(minCust, numberOfGuests) {
    return minCust === 0 || minCust <= numberOfGuests;
  }

  validateMaxCustomer(maxCust, numberOfGuests) {
    return maxCust === 0 || maxCust > numberOfGuests;
  }

  validateMoreThanPrice(priceMoreThan, pricePerPerson, numberOfGuests) {
    return priceMoreThan < pricePerPerson * numberOfGuests;
  }

  render() {
    return (
      <Panel>
        <Row>
          <Col xs={12}>
            <h1>Booking</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formNumberOfGuests">
                <ControlLabel>Number of guests</ControlLabel>
                <FormControl
                  name="numberOfGuests"
                  type="number"
                  value={this.state.numberOfGuests}
                  placeholder="Enter Number of Guests"
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>Promotion Code</ControlLabel>
                <div className="promotion-chooser">
                  <PromotionChooser listPromotion={promotions} handlePromotionChange={this.handlePromotionChange} />
                </div>
              </FormGroup>

              <Button type="submit" bsStyle="primary" bsSize="large" block>Submit</Button>
            </form>
          </Col>
          <Col xs={6}>
            bill =
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Booking;