import React from 'react';
import { Table } from 'react-bootstrap';
import { PromotionsListRow } from './PromotionsListRow';

export const PromotionsList = ({ promotions, onDelete }) => {
  return (
    <Table className="table table-hover">
      <thead>
        <tr>
          <th>Promotion Code</th>
          <th>Description</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {promotions.map(promotion => PromotionsListRow({ promotion, onDelete }))}
      </tbody>
    </Table>
  )
};