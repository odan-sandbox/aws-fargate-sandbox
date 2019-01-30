import * as cdk from'@aws-cdk/cdk';

import { ContainerEnvStack } from "./ecs"
import { ContainerRegistryStack } from "./ecr"

const app = new cdk.App()

new ContainerEnvStack(app, "container-env")
new ContainerRegistryStack(app, "container-registry")

app.run();
