import moment from 'moment';

export const formatDate = function(date) {
  return moment(date).format('DD-MM-YYYY, hh:mm:ss');
}
