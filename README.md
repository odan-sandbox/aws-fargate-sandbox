# aws-fargate-sandbox

```bash
$ yarn cdk:compile
$ yarn cdk deploy container-registry
$ AWS_SDK_LOAD_CONFIG=true yarn ts-node scripts/push.ts
$ yarn cdk deploy container-env
```