import { spawn } from "child_process";
import internal from "stream";

import logChildProcess from "./logChildProcess";

const uploadFactory =
  (binPath: string, accessGrant: string) =>
  (bucket: string, objectKey: string, stream: internal.Readable) =>
    new Promise<void>((resolve, reject) => {
      const uplink = spawn(binPath, ["upload", bucket, objectKey, accessGrant]);

      uplink.on("close", (code) => {
        if (code !== 0) reject();

        resolve();
      });

      logChildProcess(uplink, { processName: "uplink" });

      stream.pipe(uplink.stdin);
    });

export { uploadFactory };
