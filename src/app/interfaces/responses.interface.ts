import { UserModel } from './user-model.interface';
import { LocationPreferenceModel } from './location-preference.interface';
import { HomeListingModel } from './home-listing.interface';
import { HomeListingRequestModel } from './home-listing-request.interface';


/*

New Interface
---

export interface new {

}

*/



/** Common Response */

export interface SignOutResponse {
  online: boolean;
  successful: boolean;
  message: string;
}

/** GET Responses */

export interface SessionResponse {
  online: boolean;
  session_id?: string;
  user?: UserModel;
}

export interface GetUserLocationPreferenceResponse {
  location_preference: LocationPreferenceModel;
}
export interface GetUserLocationPreferencesResponse {
  location_preferences: LocationPreferenceModel[];
}

export interface GetUserHomeListingResponse {
  home_listing: HomeListingModel;
}
export interface GetUserHomeListingsResponse {
  home_listings: HomeListingModel[];
}

export interface GetHomeListingRequestResponse {
  home_listing_request: HomeListingRequestModel;
}
export interface GetHomeListingRequestsResponse {
  home_listing_requests: HomeListingRequestModel[];
}

/** POST Responses */

export interface SignUpResponse {
  online: boolean;
  user: UserModel;
  message: string;
  token: string;
  session_id: string;
}

export interface PostUserLocationPreferenceResponse {
  location_preference: LocationPreferenceModel;
  message: string;
}

export interface PostUserHomeListingResponse {
  home_listing: HomeListingModel;
  message: string;
}

/** PUT Responses */

export interface SignInResponse {
  online: boolean;
  user: UserModel;
  message: string;
  token: string;
  session_id: string;
}

export interface PutUserProfileSettingsResponse {
  user: UserModel;
  message: string;
}

export interface PutUserProfileIconResponse {
  user: UserModel;
  message: string;
}

export interface PutUserHomeListingResponse {
  home_listing: HomeListingModel;
  message: string;
}

/** DELETE Responses */

export interface DeleteUserLocationPreferenceResponse {
  message: string;
}

export interface DeleteUserHomeListingResponse {
  message: string;
}
