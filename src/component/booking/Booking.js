import React from 'react';
import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

class Booking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      numberOfPeople: 0,
      promotionCode: ''
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

    /* this.setState({
      [e.target.name]: e.target.value
    }); */
  }


  handleSubmit(e) {
    //alert('A name was submitted: ' + this.state.value);
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

          <FormGroup controlId="formNumberOfPeople">
            <ControlLabel>Number of people</ControlLabel>
            <FormControl
              name="numberOfPeople"
              type="number"
              value={this.state.numberOfPeople}
              placeholder="Enter Number of people"
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