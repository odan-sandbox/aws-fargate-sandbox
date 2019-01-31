import sdk from "aws-sdk";
import child_process from "child_process";

interface runCommandOption {
  returnStdout?: boolean
  returnStderr?: boolean
}

async function runCommand(command: string, option: runCommandOption = {}): Promise<{stdout: string, stderr: string}> {
  console.log("run command: ", command)

  const commandProcess = child_process.exec(command)
  commandProcess.stdout.pipe(process.stdout)
  commandProcess.stderr.pipe(process.stderr)

  const stdoutList: string[] = []
  const stderrList: string[] = []

  if (option.returnStdout) {
    commandProcess.stdout.on("data", data => stdoutList.push(data.toString()))
  }
  if (option.returnStderr) {
    commandProcess.stderr.on("data", data => stderrList.push(data.toString()))
  }

  return new Promise(resolve => {
    commandProcess.on('exit', () => {
      resolve({
        stdout: stdoutList.join(""),
        stderr: stderrList.join(""),
      })
    })
  })
}

async function main() {
  const ecr = new sdk.ECR();

  const { repositories } = await ecr.describeRepositories().promise();

  const repository = repositories!.find(
    repo => repo.repositoryName! === "aws-fargate-sandbox"
  );

  if (!repository) {
    console.error("not found repository. run: 'yarn cdk deploy container-registry'")
    return;
  }

  console.log("start to build")
 await runCommand(`docker build . -t ${repository.repositoryUri!}`)

  console.log("finish to build")

  const { stdout } = await runCommand(`aws ecr get-login --no-include-email`, {
    returnStdout: true
  })

  await runCommand(stdout)
  await runCommand(`docker push ${repository.repositoryUri!}`)
}

main();
