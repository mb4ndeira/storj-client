"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFactory = void 0;
const child_process_1 = require("child_process");
const logChildProcess_1 = __importDefault(require("./logChildProcess"));
const uploadFactory = (binPath, accessGrant) => (bucket, objectKey, stream) => new Promise((resolve, reject) => {
    const uplink = (0, child_process_1.spawn)(binPath, ["upload", bucket, objectKey, accessGrant]);
    uplink.on("close", (code) => {
        if (code !== 0)
            reject();
        resolve();
    });
    (0, logChildProcess_1.default)(uplink, { processName: "uplink" });
    stream.pipe(uplink.stdin);
});
exports.uploadFactory = uploadFactory;
