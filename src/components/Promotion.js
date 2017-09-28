import React from 'react';
import { Link, Route } from 'react-router-dom';

import ListPromotion from './ListPromotion';
import NewPromotionPage from './NewPromotionPage';

class Promotion extends React.Component {

  render() {
    return (
      <div>
        <h1>Manage Promotions</h1>
        <hr />
        <Link to={"/promotions/new"} className="btn btn-primary">add new</Link>
        {/* <ListPromotion /> */}
        <Route exact path="/promotions" component={ListPromotion} />
        <Route path="/promotions/new" component={NewPromotionPage} />
        {/* <Route path="/promotions/:id" component={PromotionPage} /> */}
        {/* <PromotionForm /> */}
      </div>
    );
  }
}

export default Promotion;