import React from 'react';
import { Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createPromotion, getPromotion, updatePromotion } from '../actions/promotion';
import { getPromotionById } from '../reducers/promotions';

class PromotionEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      promotionId: this.props.match.params._id,
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ promotion: nextProps.promotion });
  }

  componentDidMount() {
    if (this.state.promotionId) {
      /* const { onLoadPromotion, match: { params: { id } } } = this.props

      onLoadPromotion(id) */
      this.props.onLoadPromotion(this.state.promotionId);
    }
  }

  handleChange(e) {
    const field = e.target.name;
    const promotion = this.state.promotion;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    promotion[field] = value;
    this.setState({ promotion: promotion });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.promotionId) {
      this.props.updatePromotion(this.state.promotion).then(() => (
        this.props.history.push('/promotions')
      ));
    } else {
      this.props.createPromotion(this.state.promotion).then(() => (
        this.props.history.push('/promotions')
      ));
    }
  }

  render() {
    return (
      <div>
        <h2>{this.state.promotionId ? 'Edit' : 'Create'} Promotion</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="code">
            <ControlLabel>Promotion Code</ControlLabel>
            <FormControl
              name="code"
              type="text"
              value={this.state.promotion.code}
              placeholder="Enter Promotion Code"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              componentClass="textarea"
              name="description"
              value={this.state.promotion.description}
              placeholder="Enter Description"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="discount">
            <ControlLabel>Discount</ControlLabel>
            <FormControl
              name="discount"
              type="number"
              value={this.state.promotion.discount}
              placeholder="Enter Discount"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="minCust">
            <ControlLabel>Minimum Customer</ControlLabel>
            <FormControl
              name="minCust"
              type="number"
              value={this.state.promotion.minCust}
              placeholder="Enter Minimum Customer"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="maxCust">
            <ControlLabel>Maximum Customer</ControlLabel>
            <FormControl
              name="maxCust"
              type="number"
              value={this.state.promotion.maxCust}
              placeholder="Enter Maximum Customer"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="operatorWithPrice">
            <ControlLabel>Or check price over</ControlLabel>
            <FormControl componentClass="select" placeholder="select"
              name="operatorWithPrice"
              value={this.state.promotion.operatorWithPrice}
              onChange={this.handleChange}>
              <option value="and">No</option>
              <option value="or">Yes</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="priceMoreThan">
            <ControlLabel>Price over</ControlLabel>
            <FormControl
              name="priceMoreThan"
              type="number"
              value={this.state.promotion.priceMoreThan}
              placeholder="Enter Can use it when Price over"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Checkbox inline
              name="isAutoUse"
              checked={this.state.promotion.isAutoUse}
              onChange={this.handleChange}
            >
              auto use
          </Checkbox>
          </FormGroup>

          <button type="submit" className="btn btn-default">
            {this.state.promotionId ? 'Update' : 'Create'} Promotion
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({ promotion: getPromotionById(state, ownProps.match.params._id) }),
  {
    onLoadPromotion: getPromotion,
    createPromotion: createPromotion,
    updatePromotion: updatePromotion
  }
)(PromotionEdit)