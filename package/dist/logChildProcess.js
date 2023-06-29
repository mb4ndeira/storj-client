"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logChildProcess = (childProcess, options) => {
    childProcess.stdout.on("data", (output) => {
        console.log(output.toString("utf-8"));
    });
    childProcess.stderr.on("data", (err) => {
        console.error(err.toString("utf-8"));
    });
    childProcess.on("close", (code) => console.log(`${(options === null || options === void 0 ? void 0 : options.processName) || "process"} exited with code: ${code}`));
};
exports.default = logChildProcess;
