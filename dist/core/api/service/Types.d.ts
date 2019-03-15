/** BEGIN REGISTER TYPES */
export declare type RegisterServiceType = {
    serviceInstance?: any;
    serviceDefinition?: any;
};
export declare type RegisterServiceDataType = {
    payload: RegisterServiceType;
} & ServiceIdentifierType;
export declare type ServiceIdentifierType = {
    serviceName?: any;
    serviceId?: any;
};
export declare type RegisterStatusType = {
    success: boolean;
    reason: Error;
};
/** END REGISTER TYPES */ 
//# sourceMappingURL=Types.d.ts.map