"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFactory = void 0;
const fs_1 = __importDefault(require("fs"));
require("./go-wasm/wasm_exec");
const uploadFactory = (binPath, accessGrant) => (bucket, objectKey, stream) => __awaiter(void 0, void 0, void 0, function* () {
    const source = fs_1.default.readFileSync(binPath);
    const go = new globalThis.Go();
    globalThis.uplinkArguments = ["upload", bucket, objectKey, accessGrant];
    // globalThis.fileStream = stream;
    WebAssembly.instantiate(new Uint8Array(source).buffer, go.importObject)
        .then((result) => go.run(result.instance))
        .catch((err) => console.error("Instantiation error:" + err));
});
exports.uploadFactory = uploadFactory;
