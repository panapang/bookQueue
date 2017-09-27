import React from 'react';
import { Button, Col, ControlLabel, FormGroup, FormControl, Panel, Row } from 'react-bootstrap';
import PromotionChooser from './PromotionChooser';
import Api from "../actions/Api";

class Booking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfGuests: 0,
      selectedPromotion: [],
      totalPrice: 0,
      discount: 0,
      grandTotalPrice: 0,
      promotionCodeMaxDiscount: "",
      promotions: [],
      restaurantPricePerPerson: 0
    };

    Api.getRestaurant(res => {
      this.setState({ restaurantPricePerPerson: res ? res.price : 0 });
    });

    Api.getPromotions(res => {
      this.setState({ promotions: res });
    });

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
    const promotionDiscount = this.calculateDiscountFromPromotion(promotionCanUse, numberOfGuests, this.state.restaurantPricePerPerson);
    const promotionMaxDiscount = this.findPromotionMaxDiscount(promotionDiscount);
    const totalPrice = this.calculateTotalPrice(numberOfGuests, this.state.restaurantPricePerPerson);

    this.setState({
      totalPrice: totalPrice,
      discount: Object.keys(promotionMaxDiscount).length > 0 ? promotionMaxDiscount.discount : 0,
      promotionCodeMaxDiscount: Object.keys(promotionMaxDiscount).length > 0 ? promotionMaxDiscount.promotion.code : 0,
      grandTotalPrice: totalPrice - (Object.keys(promotionMaxDiscount).length > 0 ? promotionMaxDiscount.discount : 0)
    })
  }

  getPromotionCanUse(selectedPromotion, numberOfGuests) {
    let operators = {
      'and': function (a, b) {
        return a && b;
      },
      'or': function (a, b) {
        return a || b;
      }
    };

    return this.state.promotions
      .filter(promotion =>
        (promotion.isAutoUse || this.isInPromotion(selectedPromotion, promotion.id)) &&
        (
          operators[promotion.operatorWithPrice](
            (
              this.validateMinCustomer(promotion.minCust, numberOfGuests) &&
              this.validateMaxCustomer(promotion.maxCust, numberOfGuests)
            ),
            (this.validateMoreThanPrice(promotion.priceMoreThan, this.restaurantPricePerPerson, numberOfGuests))
          )
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

  calculateDiscountFromPromotion(promotionCanUse, numberOfGuests, restaurantPricePerPerson) {
    if (promotionCanUse.length === 0) {
      return [];
    }

    return promotionCanUse.map(
      promotion => Object.assign({}, {
        discount: this.calculateDiscount(promotion.mod, numberOfGuests, promotion.discount, restaurantPricePerPerson),
        promotion: promotion
      })
    );
  }

  calculateDiscount(mod, numberOfGuests, discount, restaurantPricePerPerson) {
    if (mod === 0) {
      return Number((numberOfGuests * restaurantPricePerPerson * discount / 100).toFixed(2));
    }

    return Number(((numberOfGuests - (numberOfGuests % mod)) * restaurantPricePerPerson * discount / 100).toFixed(2));
  }

  calculateTotalPrice(numberOfGuests, restaurantPricePerPerson) {
    return numberOfGuests * restaurantPricePerPerson;
  }

  findPromotionMaxDiscount(promotionDiscount) {
    if (!promotionDiscount || promotionDiscount.length === 0) {
      return [];
    }
    return promotionDiscount.reduce((prev, curr) => (prev.discount > curr.discount) ? prev : curr);
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
                  <PromotionChooser listPromotion={this.state.promotions} handlePromotionChange={this.handlePromotionChange} />
                </div>
              </FormGroup>

              <Button type="submit" bsStyle="primary" bsSize="large" block>Submit</Button>
            </form>
          </Col>
          <Col xs={6}>
            The best promotion is = {this.state.promotionCodeMaxDiscount}
            <br />
            Total Price = {this.state.totalPrice.toFixed(2)}
            <br />
            Discount Price = {this.state.discount.toFixed(2)}
            <br />
            Grand Total Price = {this.state.grandTotalPrice.toFixed(2)}
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Booking;