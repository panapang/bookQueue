import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { expect } from 'chai';

import Booking from '../components/Booking';

configure({ adapter: new Adapter() });

const wrapper = shallow(<Booking />);

describe('<Booking />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Booking />, div);
  });

  it('should be true when check isInPromotion case id with member', function() {
    const selectedPromotion = [1,2,3];
    const id = 2;
    expect(wrapper.instance().isInPromotion(selectedPromotion, id)).to.be.true;
  });

  it('should be false when check isInPromotion case id without selectedPromotion', function() {
    const selectedPromotion = [1,2,3];
    const id = 4;
    expect(wrapper.instance().isInPromotion(selectedPromotion, id)).to.be.false;
  });

  it('should be true when validateMinCustomer in case minCust === 0', function() {
    expect(wrapper.instance().validateMinCustomer(0, 0)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(0, 1)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(0, 2)).to.be.true;
  });

  it('should be true when validateMinCustomer in case numberOfGuests >= minCust', function() {
    expect(wrapper.instance().validateMinCustomer(1, 2)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(1, 5)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(3, 3)).to.be.true;
    expect(wrapper.instance().validateMinCustomer(3, 4)).to.be.true;
  });

  it('should be false when validateMinCustomer in case numberOfGuests <= minCust', function() {
    expect(wrapper.instance().validateMinCustomer(3, 2)).to.be.false;
    expect(wrapper.instance().validateMinCustomer(7, 5)).to.be.false;
  });

  //TODO : validateMaxCustomer, validateMoreThanPrice

});