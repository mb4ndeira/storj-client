import { ChildProcess } from "child_process";

const logChildProcess = (
  childProcess: ChildProcess,
  options?: { processName?: string }
) => {
  childProcess.stdout.on("data", (output) => {
    console.log(output.toString("utf-8"));
  });

  childProcess.stderr.on("data", (err) => {
    console.error(err.toString("utf-8"));
  });

  childProcess.on("close", (code) =>
    console.log(
      `${options?.processName || "process"} exited with code: ${code}`
    )
  );
};

export default logChildProcess;
