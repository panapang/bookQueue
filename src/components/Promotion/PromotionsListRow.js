import React from 'react';
import { Link } from 'react-router-dom';

export const PromotionsListRow = ({promotion, onDelete}) => {
  return (
    <tr key={promotion._id}>
      <td>{promotion.code}</td>
      <td>{promotion.description}</td>
      <td>
        <div className="btn-toolbar pull-right">
          <Link to={`/promotions/${promotion._id}`} className="btn btn-primary">Edit</Link>
          <a onClick={onDelete.bind(this, promotion)} className="btn btn-danger">Delete</a>
        </div>
      </td>
    </tr>
  )
};