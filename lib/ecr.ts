import * as cdk from "@aws-cdk/cdk"
import * as ecr from "@aws-cdk/aws-ecr"

export class ContainerRegistryStack extends cdk.Stack {
  constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
    super(parent, id, props);

    new ecr.Repository(this, "container-registry", {
      repositoryName: "aws-fargate-sandbox"
    })
  }
}