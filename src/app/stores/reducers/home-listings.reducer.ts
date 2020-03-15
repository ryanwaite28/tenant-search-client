import { Action, createReducer, on } from '@ngrx/store';
import * as HomeListingsActions from '../actions/home-listings.actions';
import * as HomeListingsHandlers from '../handlers/home-listings.handlers';

const homeListingsCreateReducer = createReducer([],
  on(HomeListingsActions.LOAD_HOME_LISTING_ACTION, HomeListingsHandlers.load_home_listing),
  on(HomeListingsActions.LOAD_HOME_LISTINGS_ACTION, HomeListingsHandlers.load_home_listings),
);

export function homeListingsReducer(state, action: Action) {
  return homeListingsCreateReducer(state, action);
}
