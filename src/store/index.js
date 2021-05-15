import { applyMiddleware, combineReducers, createStore } from "redux";
import { ticketReducer } from './ticketReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { sortReducer } from "./sortReducer";

const mainReducer = combineReducers({
   tickets: ticketReducer,
   sort: sortReducer,
}) 

export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));