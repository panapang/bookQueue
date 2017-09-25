import React from 'react';
import { Button, Col, ControlLabel, FormGroup, FormControl, Panel, Row, Well } from 'react-bootstrap';
import PromotionChooser from './PromotionChooser';

const listTemp = [{id:1, name: "A"}, {id:2, name: "B"}];

class Booking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfGuests: 0,
      promotionCode: '',
      listPromotion: listTemp
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
                  <PromotionChooser list={this.state.listPromotion} />
                </div>
              </FormGroup>

              <Button type="submit" bsStyle="primary" bsSize="large" block>Submit</Button>
            </form>
          </Col>
          <Col xs={6}>
            test
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Booking;