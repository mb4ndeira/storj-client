import internal from "stream";
import "./go-wasm/wasm_exec";
declare const uploadFactory: (binPath: string, accessGrant: string) => (bucket: string, objectKey: string, stream: internal.Readable) => Promise<void>;
export { uploadFactory };
