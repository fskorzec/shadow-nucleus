"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doc = {
    name: "tsc",
    shortDescription: "Compiler service",
    description: "Compiler service",
    commands: {
        compile: {
            name: "compile",
            description: "Compile source files",
            shortDescription: "Compile source files",
            exemples: ["src=./source.ts dst=."],
            parameters: {
                src: {
                    name: "src",
                    description: "The source file",
                    required: true,
                    type: "string"
                },
                dst: {
                    name: "dst",
                    description: "The destination path",
                    required: false,
                    type: "string"
                }
            }
        }
    }
};
//# sourceMappingURL=Cli.js.map