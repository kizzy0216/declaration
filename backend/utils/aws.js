import aws from 'aws-sdk';

const DECLARATION_AWS_ACCESS_KEY = process.env.DECLARATION_AWS_ACCESS_KEY;
const DECLARATION_AWS_SECRET_KEY = process.env.DECLARATION_AWS_SECRET_KEY;
const DECLARATION_AWS_REGION = process.env.DECLARATION_AWS_REGION || 'us-east-1';
const DECLARATION_AWS_BUCKET_NAME = process.env.DECLARATION_AWS_BUCKET_NAME;

aws.config.update({
  accessKeyId: DECLARATION_AWS_ACCESS_KEY,
  secretAccessKey: DECLARATION_AWS_SECRET_KEY,
  region: DECLARATION_AWS_REGION,
  bucketname: DECLARATION_AWS_BUCKET_NAME,
});

aws.config.setPromisesDependency(null);

export default aws;
