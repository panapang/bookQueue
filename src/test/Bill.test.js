import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';
import fetch from 'isomorphic-fetch'

import Bill from '../components/Bill/Bill';

configure({ adapter: new Adapter() });

const wrapper = shallow(<Bill />);

describe('<Bill />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Bill />, div);
  });

  it('should be true when check isInPromotion case id with member', function () {
    const selectedPromotion = [1, 2, 3];
    const id = 2;
    expect(wrapper.instance().isInPromotion(selectedPromotion, id)).to.be.true;
  });

  it('should be false when check isInPromotion case id without selectedPromotion', function () {
    const selectedPromotion = [1, 2, 3];
    const id = 4;
    expect(wrapper.instance().isInPromotion(selectedPromotion, id)).to.be.false;
  });

  it('should be true when validateMinCustomer in case min is 0', function () {
    expect(wrapper.instance().validateMinCustomer(0, 0)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(0, 1)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(0, 2)).to.be.true;
  });

  it('should be true when validateMinCustomer in case numberOfGuests >= min', function () {
    expect(wrapper.instance().validateMinCustomer(1, 2)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(1, 5)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(3, 3)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(3, 4)).to.be.true;
  });

  it('should be false when validateMinCustomer in case numberOfGuests <= min', function () {
    expect(wrapper.instance().validateMinCustomer(3, 2)).to.be.false;
    expect(wrapper.instance().validateMinCustomer(7, 5)).to.be.false;
  });

  it('should be true when validateMaxCustomer in case mmax is 0', function () {
    expect(wrapper.instance().validateMaxCustomer(0, 0)).to.be.true;
    expect(wrapper.instance().validateMaxCustomer(0, 1)).to.be.true;
    expect(wrapper.instance().validateMaxCustomer(0, 2)).to.be.true;
  });

  it('should be true when validateMaxCustomer in case numberOfGuests <= max', function () {
    expect(wrapper.instance().validateMaxCustomer(3, 2)).to.be.true;
    expect(wrapper.instance().validateMaxCustomer(7, 5)).to.be.true;
  });

  it('should be false when validateMaxCustomer in case numberOfGuests > max', function () {
    expect(wrapper.instance().validateMaxCustomer(3, 10)).to.be.false;
    expect(wrapper.instance().validateMaxCustomer(7, 8)).to.be.false;
  });

  it('should be true when validateMoreThanPrice in case > totalPrice', function () {
    expect(wrapper.instance().validateMoreThanPrice(0, 10, 5)).to.be.true;
    expect(wrapper.instance().validateMoreThanPrice(10, 10, 5)).to.be.true;
  });

  it('should be false when validateMoreThanPrice in case > totalPrice', function () {
    expect(wrapper.instance().validateMoreThanPrice(1000, 10, 5)).to.be.false;
    expect(wrapper.instance().validateMoreThanPrice(10, 0, 5)).to.be.false;
    expect(wrapper.instance().validateMoreThanPrice(10, 10, 0)).to.be.false;
  });

  it('should return correctly when calculateDiscount without mod', function () {
    expect(wrapper.instance().calculateDiscount(0, 2, 20, 100)).to.equal(40);
    expect(wrapper.instance().calculateDiscount(0, 1, 15, 100)).to.equal(15);
    expect(wrapper.instance().calculateDiscount(0, 0, 15, 100)).to.equal(0);
    expect(wrapper.instance().calculateDiscount(0, 1, 15, 459)).to.equal(68.85);
    expect(wrapper.instance().calculateDiscount(0, 3, 15, 459)).to.equal(206.55);
  });

  it('should return correctly when calculateDiscount with mod', function () {
    expect(wrapper.instance().calculateDiscount(2, 2, 20, 100)).to.equal(40);
    expect(wrapper.instance().calculateDiscount(2, 4, 20, 100)).to.equal(80);
    expect(wrapper.instance().calculateDiscount(2, 3, 20, 100)).to.equal(40);
    expect(wrapper.instance().calculateDiscount(4, 4, 25, 100)).to.equal(100);

    expect(wrapper.instance().calculateDiscount(2, 2, 20, 459)).to.equal(183.60);
    expect(wrapper.instance().calculateDiscount(2, 4, 20, 459)).to.equal(367.20);
    expect(wrapper.instance().calculateDiscount(4, 4, 25, 459)).to.equal(459);
    expect(wrapper.instance().calculateDiscount(4, 8, 25, 459)).to.equal(918);
  });

  it('should calculateTotalPrice correctly', function () {
    expect(wrapper.instance().calculateTotalPrice(0, 0)).to.equal(0);
    expect(wrapper.instance().calculateTotalPrice(10, 0)).to.equal(0);
    expect(wrapper.instance().calculateTotalPrice(0, 10)).to.equal(0);
    expect(wrapper.instance().calculateTotalPrice(10, 10)).to.equal(100);
  });

  it('should return empty array when findPromotionMaxDiscount without promotionDiscount', function () {
    expect(wrapper.instance().findPromotionMaxDiscount(null)).to.be.an('array').that.is.empty;
    expect(wrapper.instance().findPromotionMaxDiscount("")).to.be.an('array').that.is.empty;
    expect(wrapper.instance().findPromotionMaxDiscount([])).to.be.an('array').that.is.empty;
  });

});