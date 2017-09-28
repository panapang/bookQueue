import React from 'react';
import { Checkbox, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class PromotionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="code">
                    <ControlLabel>Promotion Code</ControlLabel>
                    <FormControl
                        name="code"
                        type="text"
                        value={this.props.promotion.code}
                        placeholder="Enter Promotion Code"
                        onChange={this.props.onChange}
                    />
                </FormGroup>

                <FormGroup controlId="description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        name="description"
                        value={this.props.promotion.description}
                        placeholder="Enter Description"
                        onChange={this.props.onChange}
                    />
                </FormGroup>

                <FormGroup controlId="discount">
                    <ControlLabel>Discount</ControlLabel>
                    <FormControl
                        name="discount"
                        type="number"
                        value={this.props.promotion.discount}
                        placeholder="Enter Discount"
                        onChange={this.props.onChange}
                    />
                </FormGroup>

                <FormGroup controlId="minCust">
                    <ControlLabel>Minimum Customer</ControlLabel>
                    <FormControl
                        name="minCust"
                        type="number"
                        value={this.props.promotion.minCust}
                        placeholder="Enter Minimum Customer"
                        onChange={this.props.onChange}
                    />
                </FormGroup>

                <FormGroup controlId="maxCust">
                    <ControlLabel>Maximum Customer</ControlLabel>
                    <FormControl
                        name="maxCust"
                        type="number"
                        value={this.props.promotion.maxCust}
                        placeholder="Enter Maximum Customer"
                        onChange={this.props.onChange}
                    />
                </FormGroup>

                <FormGroup controlId="operatorWithPrice">
                    <ControlLabel>Or check price over</ControlLabel>
                    <FormControl componentClass="select" placeholder="select"
                        name="operatorWithPrice"
                        value={this.props.operatorWithPrice}
                        onChange={this.props.onChange}>
                        <option value="and">No</option>
                        <option value="or">Yes</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="priceMoreThan">
                    <ControlLabel>Price over</ControlLabel>
                    <FormControl
                        name="priceMoreThan"
                        type="number"
                        value={this.props.promotion.priceMoreThan}
                        placeholder="Enter Can use it when Price over"
                        onChange={this.props.onChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Checkbox inline
                        name="isAutoUse"
                        checked={this.props.promotion.isAutoUse}
                        onChange={this.props.onChange}>
                        auto use
                    </Checkbox>
                </FormGroup>

                <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary"
                    onClick={this.props.onSave} />
            </form>
        );
    }
}

export default PromotionForm;