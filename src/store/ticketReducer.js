const SET_TICKETS = "SET_TICKETS";
const SET_SORTED_TICKETS = "SET_SORTED_TICKETS";

const initialState = {
   tickets: [],
   sortedTickets: [],
}

export const ticketReducer = (state = initialState, action) => {
   switch(action.type) {
      case SET_TICKETS:
         return {...state, tickets: action.payload};
      case SET_SORTED_TICKETS:
         return {...state, sortedTickets: action.payload};
      default:
         return state;
   }
}

export const setTickets = (payload) => ({type: SET_TICKETS, payload});
export const setSortedTickets = (payload) => ({type: SET_SORTED_TICKETS, payload});