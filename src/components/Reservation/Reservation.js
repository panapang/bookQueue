import React from 'react';
import { Button, Col, ControlLabel, FormGroup, FormControl, Panel, Row } from 'react-bootstrap';

import TableApi from '../../actions/TableApi';

class Reservation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      guests: 0,
      table: "",
      isFull: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      guests: Number(e.target.value)
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    TableApi.reserveTable(this.state.guests).then(res => {
      this.setState({ isFull: res.isFull });
      this.setState({ table: res.name });
    });
  }

  render() {
    return (
      <Panel>
        <Row>
          <Col xs={12}>
            <h1>Reservation</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formGuests">
                <ControlLabel>Number of guests</ControlLabel>
                <FormControl
                  name="guests"
                  type="number"
                  value={this.state.guests}
                  placeholder="Enter Number of Guests"
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <Button type="submit" bsStyle="primary" bsSize="large" block>Submit</Button>
            </form>
          </Col>
          <Col xs={6}>
            <h2 hidden={!this.state.isFull}>No Table</h2>
            <h2 hidden={this.state.isFull || this.state.table === ""}>
              table = {this.state.table}
            </h2>
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Reservation;