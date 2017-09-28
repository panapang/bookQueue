import React from 'react';
import { Button } from 'react-bootstrap';

class TableChooserRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    let reserveData = {
      name: this.props.name,
      guests: this.props.reserved.guests
    };

    this.props.selectedTable(reserveData);
  }

  render() {
    return (
      <div hidden={!this.props.isReserved}>
        <Button className="btnTable"
          onClick={this.clickHandler}>
          {this.props.name}
        </Button>
      </div>
    );
  }
}

export default TableChooserRow;