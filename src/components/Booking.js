import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Booking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numberOfGuests: 0,
      promotionCode: '',
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
      <div>
        <h1>Booking</h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formName">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              name="name"
              type="text"
              value={this.state.name}
              placeholder="Enter name"
              onChange={this.handleInputChange}
            />
          </FormGroup>

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

          <FormGroup controlId="formPromotionCode" >
            <ControlLabel>Promotion Code</ControlLabel>
            <FormControl
              name="promotionCode"
              type="text"
              value={this.state.promotionCode}
              placeholder="Enter Promotion Code"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Booking;