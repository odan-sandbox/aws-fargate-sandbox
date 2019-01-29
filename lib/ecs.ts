import * as cdk from'@aws-cdk/cdk';
import * as ec2 from'@aws-cdk/aws-ec2';
import * as ecs from'@aws-cdk/aws-ecs';

export class ContainerEnvStack extends cdk.Stack {
  constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
    super(parent, id, props);

    const vpc = new ec2.VpcNetwork(this, 'MyVpc', {
      maxAZs: 3 // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc
    });

    new ecs.LoadBalancedFargateService(this, 'MyFargateService', {
      cluster: cluster,  // Required
      cpu: '256', // Default is 256
      desiredCount: 3,  // Default is 1
      image: ecs.ContainerImage.fromDockerHub('amazon/amazon-ecs-sample'), // Required
      memoryMiB: '256',  // Default is 512
      publicLoadBalancer: true  // Default is false
    });
  }
}