import React from 'react';
import { Button, Col, ControlLabel, FormGroup, FormControl, Panel, Row } from 'react-bootstrap';
import PromotionChooser from './PromotionChooser';

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
  }

  handlePromotionChange(selectedPromotion) {
    console.log(selectedPromotion);
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
                  <PromotionChooser listPromotion={promotions} handlePromotionChange={this.handlePromotionChange}/>
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