import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Api from '../../actions/Api';

class ListPromotion extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      promotions: []
    };
  }

  componentDidMount() {
    Api.getPromotions(res => {
      this.setState({ promotions: res });
    });
  }

  render() {
    var promotionRows = this.state.promotions.map(promotion => (
      <tr key={promotion._id}>
        <td>{promotion.code}</td>
        <td>{promotion.description}</td>
        <td className="text-center">
          <Link to={'/promotions/' + promotion._id}>Edit</Link>
        </td>
      </tr>
    ));

    return (
      <div>
        <h1>Manage Promotions</h1>
        <hr />
        <Link to={'/createpromotion'} className="btn btn-primary pull-right">Add New</Link>

        <Table>
          <thead>
            <tr>
              <th>Promotion Code</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {promotionRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ListPromotion;