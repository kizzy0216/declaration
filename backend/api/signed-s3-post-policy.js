import { v4 as uuidv4 } from 'uuid';

const DECLARATION_AWS_BUCKET_NAME = process.env.DECLARATION_AWS_BUCKET_NAME;

import setCORS from '../utils/setCORS';
import setUser from '../utils/setUser';
import aws from '../utils/aws';

const S3 = new aws.S3();

const handlers = {
  OPTIONS: (request, response) => {
    return response.status(200).send();
  },
  POST: async (request, response) => {
    if (!request.user) {
      return response.status(403).json({
        error: 'Only authenticated users can upload files',
      });
    }

    const { contentType } = request.body;
    const key = `${uuidv4()}.${contentType.split('/').pop()}`;

    const signedPost = await S3.createPresignedPost({
      Bucket: DECLARATION_AWS_BUCKET_NAME,
      Fields: {
        key,
        'X-Amz-Meta-UserId': request.user.uuid,
      },
      Expires: 60 * 10, // 10 mins
      Conditions: [
        { bucket: DECLARATION_AWS_BUCKET_NAME },
        { key },
        { 'Content-Type': contentType },
        ['content-length-range', 0, 20971520] // 0 - 20MB
      ],
    });

    return response.status(201).json(signedPost);
  },
};

const signedS3PostPolicy = async (request, response) => {
  setCORS(request, response);
  await setUser(request, response);

  handlers[request.method] && handlers[request.method](request, response);
};

export default signedS3PostPolicy;
