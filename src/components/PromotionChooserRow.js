import React from 'react';

class PromotionChooserRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    var active = !this.state.active;
    this.setState({ active: active });
  }

  render() {
    return (
      <p className={this.state.active ? 'active' : ''} onClick={this.clickHandler}>
        {this.props.name} <b>test</b>
      </p>
    );
  }
}

export default PromotionChooserRow;