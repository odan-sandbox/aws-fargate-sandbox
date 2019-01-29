import * as cdk from'@aws-cdk/cdk';

import { ContainerEnvStack } from "./ecs"

const app = new cdk.App()

new ContainerEnvStack(app, "container-env")

app.run();
