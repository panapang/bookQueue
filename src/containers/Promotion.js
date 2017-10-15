import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { PromotionsList } from '../components/Promotion/PromotionsList';
import { loadPromotions, deletePromotion } from '../actions/promotion'

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

  deletePromotion = (promotion) => {
    this.props.deletePromotion(promotion);
  }

  render() {
    const {
      params,
      promotions,
    } = this.props;

    return (
      <div>
        <h1>Manage Promotions</h1>
        <hr />
        <div className="pull-right">
          <Link to="/createpromotion" className="btn btn-primary">New Promotion</Link>
        </div>
        <PromotionsList
          promotions={promotions}
          onDelete={this.deletePromotion} />
      </div>
    );
  }
}

export default connect(
  (state) => ({ promotions: state.promotions }),
  {
    onLoadPromotions: loadPromotions,
    deletePromotion: deletePromotion
  }
)(Promotion)