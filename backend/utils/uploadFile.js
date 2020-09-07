import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

import aws from '../utils/aws.js';

const S3 = new aws.S3();
const DECLARATION_AWS_BUCKET_NAME = process.env.DECLARATION_AWS_BUCKET_NAME;

function uploadFile({
  filePath,
}) {
  const file = fs.readFileSync(filePath);
  const extension = filePath.split('.').pop();
  const key = `${uuidv4()}.${extension}`;

  return new Promise((resolve, reject) => {
    S3.upload({
      Bucket: DECLARATION_AWS_BUCKET_NAME,
      Key: key,
      Body: file,
    }, (error, data) => {
      if (error) {
        return reject(error);
      }

      console.dir(data);
      return resolve(data);
    });
  });
}

export default uploadFile;
