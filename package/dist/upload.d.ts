import internal from "stream";
declare const uploadFactory: (binPath: string, accessGrant: string) => (bucket: string, objectKey: string, stream: internal.Readable) => Promise<void>;
export { uploadFactory };
