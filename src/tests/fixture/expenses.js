import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Aluguel',
    note: '',
    amount: 1200,
    createdAt: 0
  },
  {
    id: '2',
    description: 'Mercado',
    note: '',
    amount: 550,
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf()
  },
  {
    id: '3',
    description: 'Contas de Consumo',
    note: '',
    amount: 280,
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf()
  }
];
