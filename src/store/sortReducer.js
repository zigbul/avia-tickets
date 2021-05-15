const SET_SORTED = 'SET_SORTED';
const SET_FILTER_BY_STOPS = 'SET_FILTER_BY_STOPS';
const SET_FILTER_BY_PRICE = 'SET_FILTER_BY_PRICE';
const SET_FILTER_BY_COMPANY = 'SET_FILTER_BY_COMPANY';

const initialState = {
   sorted: {
      toHigherPrice: true,
      toLowerPrice: false,
      toTimeInFlight: false,
   },
   filterByStops: {
      all: true,
      oneStop: false,
      noStops: false,
   },
   filterByPrice: {
      minValue: 0,
      maxValue: 0,
   },
   filterByCompany: {
      all: true,
      LOT: false,
      Aeroflot: false,
   }
} 

export const sortReducer = (state = initialState, action) => {
   switch(action.type) {
      case SET_SORTED:
         return {...state, sorted: action.payload};
      case SET_FILTER_BY_STOPS:
         return {...state, filterByStops: action.payload};
      case SET_FILTER_BY_PRICE:
         return {...state, filterByPrice: action.payload};
      case SET_FILTER_BY_COMPANY:
         return {...state, filterByCompany: action.payload};
      default:
         return state;
   }
}

export const setSorted = (payload) => ({type: SET_SORTED, payload});
export const setFilterByStops = (payload) => ({type: SET_FILTER_BY_STOPS, payload});
export const setFilterByPrice = (payload) => ({type: SET_FILTER_BY_PRICE, payload});
export const setFilterByCompany = (payload) => ({type: SET_FILTER_BY_COMPANY, payload});