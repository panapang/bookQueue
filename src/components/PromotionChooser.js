import React from 'react';
import PromotionChooserRow from './PromotionChooserRow';

class PromotionChooser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPromotion: []
    };

    this.selectedPromotion = this.selectedPromotion.bind(this);
    this.unselectedPromotion = this.unselectedPromotion.bind(this);
    this.callback = this.callback.bind(this);

  }

  selectedPromotion(id) {
    this.setState(prevState => ({
      selectedPromotion: [...prevState.selectedPromotion, id]
    }), this.callback);
  }

  // Notify the Booking
  callback() {
    this.props.handlePromotionChange(this.state.selectedPromotion);
  }

  unselectedPromotion(id) {
    this.setState(prevState => ({
      selectedPromotion: (prevState.selectedPromotion.filter(p => p !== id))
    }), this.callback);
  }

  render() {
    const item = (itemData) => {
      return <PromotionChooserRow key={itemData.id} {...itemData} active={itemData.active}
        selectedPromotion={this.selectedPromotion} unselectedPromotion={this.unselectedPromotion} />
    };

    return (
      <div className="seating">
        {this.props.listPromotion.map(item)}
      </div>
    );
  }
}

export default PromotionChooser;