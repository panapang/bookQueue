import React from 'react';

import TableChooserRow from './TableChooserRow';

class TableChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reserveData: {}
    };

    this.selectedTable = this.selectedTable.bind(this);
    this.callback = this.callback.bind(this);
  }

  selectedTable(data) {
    let reserveData = {
      name: data.name,
      guests: data.guests
    };

    this.setState({ reserveData: reserveData }, this.callback);
  }

  // Notify the Booking
  callback() {
    this.props.handleTableClick(this.state.reserveData);
  }

  render() {

    const item = (itemData) => {
      return <TableChooserRow key={itemData.name} {...itemData} selectedTable={this.selectedTable} />
    };

    return (
      <div>
        {this.props.tables.map(item)}
      </div>
    );
  }
}

export default TableChooser;