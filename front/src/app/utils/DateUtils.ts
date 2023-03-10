import * as moment from "moment/moment";

export function formatDate(date: Date) {
  return moment(date).locale('fr').format('DD MMMM');
}
