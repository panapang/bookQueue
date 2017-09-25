const promotions = [
  {
    id: 1,
    code: 'LUCKY ONE',
    description: 'Discount 15% for coupon code "LUCKYONE" or the bill is more than 1000 Bath.',
    discount: 15,
    priceMoreThan: 1000
  },
  {
    id: 2,
    code: '4PAY3',
    description: 'Come 4 pay 3 when they present coupon code as "4PAY3"',
    discount: 25,
    minCust: 4
  },
  {
    id: 3,
    code: 'LUCKY TWO',
    description: 'Discount 20% for 2 customer when they present a coupon code as "LUCKY TWO"',
    discount: 20,
    minCust: 2,
  },
  {
    id: 4,
    code: '',
    description: 'Discount 25% when the bill is over 6000 Bath but it exclude all promotion.',
    discount: 15,
    priceMoreThan: 6000
  },
];

export default promotions;