/** BEGIN REGISTER TYPES */
export type RegisterServiceType = {
  serviceInstance   ? : any ;
  serviceDefinition ? : any ;
};

export type RegisterServiceDataType = {
  payload       : RegisterServiceType ;
} & ServiceIdentifierType;

export type ServiceIdentifierType = {
  serviceName ? : any ;
  serviceId   ? : any ;
}

export type RegisterStatusType = {
  success : boolean ;
  reason  : Error   ;
};
/** END REGISTER TYPES */