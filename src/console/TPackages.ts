export type App = Partial<{
	name: string;
	appName:string;
	shortDescription: string;
	version: string;
	
	packages: {
		[index: string] : Package;
	}
}>

export type Package = Partial<{
	name: string;
	shortDescription: string;
	description: string;

	commands: {
		[index: string] : Command;
	},
	exemples: Array<string>;
}>;

export type Command = Partial<{
	name: string;	
	shortDescription: string;
	description: string;
	usages: Array<string>;
	
	parameters: {
		[index: string] : Parameter;
	},
	exemples: Array<string>;
}>;

export type Parameter = Partial<{
	name		 : string  ;
	type		 : string  ;
	required : boolean ;
	description: string;
	exemples: Array<string>;
}>;