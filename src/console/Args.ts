/**
 * The MIT License (MIT)
 * Copyright (c) <2016> <Beewix>
 * Author <François Skorzec>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITxNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * This types provides a description of the command line arguments
 * format
 */
export type CommandArgs = {
    package: string;
    command: string;
    parameters: {
        [name: string]: string;
    }
};

/**
 * Parse arguments
 */
export function prepareCliArguments(...args: string[]): CommandArgs {
	let res: CommandArgs = <any>{};

	res.package = args.shift() || "help";
	res.command = args.shift() || "help";

	if (args && args.length > 0) {
		res.parameters = {};
		while (args.length > 0) {
			const nextArg = args.shift();
			if (nextArg) {
					let param: string[] = nextArg.split("=");
					res.parameters[param[0]] = param[1] || "";
			}
		}
	}
	return res;
}