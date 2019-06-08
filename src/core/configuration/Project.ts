import { Package } from "../../Types/Package";

// Project json
export type Project = {
  id   : string ;
  name : string ;

  packages : Array<Package>; // List of all packages installed, including deps
}