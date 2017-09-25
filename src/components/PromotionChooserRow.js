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

    // Notify the PromotionChooser
    if (active) {
      this.props.selectedPromotion(this.props.id);
    } else {
      this.props.unselectedPromotion(this.props.id);
    }
  }

  render() {
    return (
      <div className={this.state.active ? 'active box' : 'box'} onClick={this.clickHandler}>
        <h4>{this.props.code}</h4>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default PromotionChooserRow;