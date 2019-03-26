export const CLI_ALL_EVENTS = "allEvents";

export const CLI_IDENTITY = {
  serviceName : "CLI",
  serviceId   : "com.nucleus"
};

export type TEnvInfo = {
  args                  : Array<string> ;
  nodeExecpath          : string        ;
  nucleusExecPath       : string        ;
  nucleusExecFolderPath : string        ;
  callerPath            : string        ;
  params                : CommandArgs   ;
};

export type CommandArgs = {
  package: string ;
  command: string ;
  parameters: {
      [name: string]: string;
  }
};