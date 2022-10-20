import moment from 'moment';
import 'moment/locale/vi';

export default function formatDate(date) {
  return moment(date).format('LLL');
}
