import { HomeListingModel } from './home-listing.interface';
import { UserModel } from './user-model.interface';

export interface HomeListingRequestModel {
  id: number;
  home_listing_id: number;
  home_owner_id: number;
  tenant_id: number;
  message: string;
  pre_approved: boolean;
  accepted: boolean | null;
  uuid: string;
  updatedAt: string;
  createdAt: string;
  //
  home_listing?: HomeListingModel;
  tenant?: UserModel;
}
