import { uploadFactory } from "./upload";

const uplink = ({
  binaryPath = "./node_modules/storj-client/dist/uplink.bin",
  storjAccessGrant,
}: {
  binaryPath?: string;
  storjAccessGrant: string;
}) => ({ upload: uploadFactory(binaryPath, storjAccessGrant) });

export default uplink;
