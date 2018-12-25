import { Location } from "./interfaces";

export interface BackendApi {
  createOrUpdateLocation(location: Location, oldLocation?: Location): Promise<Location>;
  deleteLocation(locationId: string): Promise<void>;
  getLocation(id: string): Promise<Location>;
  getAllLocations(): Promise<{ [id: string]: Location }>;
  getAllTags(): Promise<string[]>;
}
