import { Project } from "./Project" ;
import { Package } from "./Package" ;

// Solution json
export type Solution = {
  // Meta
  name    : string ; // Solution name                                 
  version : string ; // Optional for the solution                     
  id      : string ; // Global ID to use as a fallback ex: com.nucleus

  packages : Array<Package> ; // List of all packages installed , including deps         
  projects : Array<Project> ; // List of all projects
}