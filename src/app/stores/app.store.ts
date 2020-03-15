import { userReducer } from './reducers/user.reducers';
import { homeListingsReducer } from './reducers/home-listings.reducer';
import { UserEffects } from './effects/user.effects';


export const AppStoreObj = {
  you: userReducer,
  homeListings: homeListingsReducer,
};

export const AppEffectsList = [
  UserEffects,
];
