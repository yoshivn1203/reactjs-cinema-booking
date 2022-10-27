import moment from 'moment';
import 'moment/locale/vi';

export default function formatDate(date) {
  return moment(date).format('Do MMMM YYYY - HH:MM');
}

export const formatShortDate = (date) => {
  return moment(date).format('DD-MM-YYYY');
};

export const formatDateButton = (date) => {
  return moment(date).format('ddd - HH:MM');
};
