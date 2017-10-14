import React from 'react';
import { connect } from 'react-redux'

import ListPromotion from '../components/Promotion/ListPromotion';
import { loadPromotions } from '../actions/promotion'

class Promotion extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.promotions !== nextProps.promotions;
  }

  onReloadPromotions = () => {
    this.props.onLoadPromotions();
  }

  componentDidMount() {
    this.onReloadPromotions();
  }

  render() {
    return (
      <div>
        <h1>Manage Promotions</h1>
        <hr />
        <ListPromotion
          promotions={this.props.promotions}
          onReloadPages={this.onReloadPromotions} />
      </div>
    );
  }
}

export default connect(
  (state) => ({ promotions: state.promotions }),
  { onLoadPromotions: loadPromotions }
)(Promotion)