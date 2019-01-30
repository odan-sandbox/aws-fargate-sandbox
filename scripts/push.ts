import sdk from "aws-sdk";
import child_process from "child_process";
import { promisify } from "util";

async function main() {
  const ecr = new sdk.ECR();

  const { repositories } = await ecr.describeRepositories().promise();

  const repository = repositories!.find(
    repo => repo.repositoryName! === "aws-fargate-sandbox"
  );

  const exec = promisify(child_process.exec).bind(child_process);

  console.log("start to build")
  const { stdout } = await exec(
    `docker build . -t ${repository!.repositoryUri!}`
  );

  console.log(stdout);
  console.log("finish to build")

  await exec(`$(aws ecr get-login --no-include-email)`)
  await exec(`docker push ${repository!.repositoryUri!}`)
}

main();
