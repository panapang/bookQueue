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

    this.restaurantPricePerPerson = restaurant.price;

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

  handlePromotionChange(selectedPromotion) {
    this.setState({ selectedPromotion: selectedPromotion });
  }

  handleSubmit(e) {
    e.preventDefault();

    const numberOfGuests = this.state.numberOfGuests;
    const selectedPromotion = this.state.selectedPromotion;

    this.calculateBill(selectedPromotion, numberOfGuests);
  }

  calculateBill(selectedPromotion, numberOfGuests) {
    const promotionCanUse = this.getPromotionCanUse(selectedPromotion, numberOfGuests);

    //TODO : implement total price
  }

  getPromotionCanUse(selectedPromotion, numberOfGuests) {
    return promotions
      .filter(promotion =>
        eval(
          (this.isInPromotion(selectedPromotion, promotion.id) &&
            this.validateMinCustomer(promotion.minCust, numberOfGuests) &&
            this.validateMaxCustomer(promotion.maxCust, numberOfGuests))
          + (promotion.operatorWithPrice === 'or' ? ' || ' : ' && ') +
          this.validateMoreThanPrice(promotion.priceMoreThan, this.restaurantPricePerPerson, numberOfGuests)
        )
      );
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

  calculateDiscount(mod, numberOfGuests, discount, restaurantPricePerPerson) {
    if (mod === 0) {
      return (numberOfGuests * restaurantPricePerPerson * discount / 100).toFixed(2);
    }

    return ((numberOfGuests - (numberOfGuests % mod)) * restaurantPricePerPerson * discount / 100).toFixed(2);
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