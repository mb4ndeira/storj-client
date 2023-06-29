/// <reference types="node" />
declare const uplink: ({ binaryPath, storjAccessGrant, }: {
    binaryPath?: string;
    storjAccessGrant: string;
}) => {
    upload: (bucket: string, objectKey: string, stream: import("stream").Readable) => Promise<void>;
};
export default uplink;
