import { createAction, props } from '@ngrx/store';

export const LOAD_HOME_LISTING = '[HomeListings] LOAD_HOME_LISTING';
export const LOAD_HOME_LISTING_ACTION = createAction(LOAD_HOME_LISTING, props<{ [key: string]: any }>());

export const LOAD_HOME_LISTINGS = '[HomeListings] LOAD_HOME_LISTINGS';
export const LOAD_HOME_LISTINGS_ACTION = createAction(LOAD_HOME_LISTINGS, props<{ [key: string]: any }>());
