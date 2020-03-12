import { userReducer } from './reducers/user.reducers';
import { UserEffects } from './effects/user.effects';


export const AppStoreObj = {
  user: userReducer
};

export const AppEffectsList = [
  UserEffects
];
