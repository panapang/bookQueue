import React from 'react';

import ListPromotion from './ListPromotion';

class Promotion extends React.Component {

  render() {
    return (
      <div>
        <h1>Manage Promotions</h1>
        <hr />
        <ListPromotion/>
      </div>
    );
  }
}

export default Promotion;