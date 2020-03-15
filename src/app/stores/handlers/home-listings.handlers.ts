import { HomeListingModel } from 'src/app/interfaces/home-listing.interface';

const applyUpdate = (state, home: HomeListingModel) => {
  const findHome = state.find((h) => h.id === home.id);
  if (!findHome) {
    state.push(home);
  } else {
    Object.assign(findHome, home);
  }
  return state;
};

export function load_home_listing(state, action) {
  const homeListing: HomeListingModel = action.homeListing || action;
  applyUpdate(state, homeListing);
  return state;
}

export function load_home_listings(state, action) {
  const homeListings: HomeListingModel[] = action.homeListings || action;
  homeListings.forEach((home) => {
    applyUpdate(state, home);
  });
  return state;
}
