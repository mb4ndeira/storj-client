import { ChildProcess } from "child_process";
declare const logChildProcess: (childProcess: ChildProcess, options?: {
    processName?: string;
}) => void;
export default logChildProcess;
