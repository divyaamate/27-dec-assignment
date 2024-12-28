const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  region: process.env.region,
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretKey,
});

const generatePresignedUrl = async (key , type) => {

  
      const fileExtention = type.split("/")[1];
      const fileType1 = fileExtention ? `.${fileExtention}` : ".jpeg";
      let param = key + fileType1;

  const params = {
    Bucket: process.env.bucket,
    Key: param,
    Expires: 60, // URL expiration time in seconds
    ContentType: type, // Set the appropriate content type
    ACL: "public-read"
  };

  return s3.getSignedUrlPromise('putObject', params);
};

module.exports = { generatePresignedUrl }

