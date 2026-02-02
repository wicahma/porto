"use server";
import { S3Client } from "@aws-sdk/client-s3";

const env = process.env;

const client = new S3Client({
  forcePathStyle: true,
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY as string,
  },
});

const initialiedBucket = async () => client;

export default initialiedBucket;
