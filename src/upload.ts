import internal from "stream";
import fs from "fs";

import "./go-wasm/wasm_exec";

const uploadFactory =
  (binPath: string, accessGrant: string) =>
  async (bucket: string, objectKey: string, stream: internal.Readable) => {
    const source = fs.readFileSync(binPath);

    const go = new globalThis.Go();

    globalThis.uplinkArguments = ["upload", bucket, objectKey, accessGrant];
    // globalThis.fileStream = stream;

    WebAssembly.instantiate(new Uint8Array(source).buffer, go.importObject)
      .then((result) => go.run(result.instance))
      .catch((err) => console.error("Instantiation error:" + err));
  };

export { uploadFactory };
