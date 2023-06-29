"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = require("./upload");
const uplink = ({ binaryPath = "./node_modules/storj-client/dist/uplink.bin", storjAccessGrant, }) => ({ upload: (0, upload_1.uploadFactory)(binaryPath, storjAccessGrant) });
exports.default = uplink;
