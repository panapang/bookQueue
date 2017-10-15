import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Api from '../../actions/Api';
import PromotionForm from './PromotionForm';

class PromotionPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      promotion: {
        code: '',
        description: '',
        discount: 0,
        minCust: 0,
        maxCust: 0,
        operatorWithPrice: 'and',
        priceMoreThan: 0,
        mod: 0,
        isAutoUse: false
      }
    };

    this.savePromotion = this.savePromotion.bind(this);
    this.updatePromotionState = this.updatePromotionState.bind(this);
  }

  componentDidMount() {
    Api.getPromotion(this.props.match.params._id).then(res => (
      res ? this.setState({ promotion: res }) : this.props.history.push('/promotions')
    ))
  }

  savePromotion(e) {
    e.preventDefault();
    this.setState({ saving: true });
    Api.updatePromotion(this.state.promotion).then(() =>
      this.props.history.push('/promotions')
    );
  }

  updatePromotionState(e) {
    const field = e.target.name;
    const promotion = this.state.promotion;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    promotion[field] = value;
    return this.setState({ promotion: promotion });
  }

  render() {
    return (
      <div>
        <h2>Edit Promotion</h2>

        <PromotionForm
          promotion={this.state.promotion}
          onSave={this.savePromotion}
          onChange={this.updatePromotionState} />
      </div>
    );
  }
}

export default withRouter(PromotionPage);