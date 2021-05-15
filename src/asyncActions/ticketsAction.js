import * as flights from '../utils/flights.json';
import { setTickets } from '../store/ticketReducer';

export const fetchTickets = () => {
   return dispatch => {
      return new Promise((resolve, reject) => {
         resolve(flights);
      })
      .then((flights) => dispatch(setTickets(flights.default.result.flights)))
      .catch(e => console.log(e));
   }
}