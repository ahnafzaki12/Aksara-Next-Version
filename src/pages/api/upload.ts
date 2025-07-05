import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime-types";
import fs from "fs";

const bucketName = 'ahnaf-next-ecommerce'; // Bucket yang sama

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = new multiparty.Form();
    const { files }: { fields: any; files: any } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const client = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });

    const links: string[] = [];

    if (files.file && files.file.length > 0) {
      for (const file of files.file) {
        const ext = file.originalFilename?.split('.').pop();
        const newFileName = Date.now() + '.' + ext;

        await client.send(new PutObjectCommand({
          Bucket: bucketName,
          Key: newFileName,
          Body: fs.readFileSync(file.path),
          ACL: 'public-read',
          ContentType: mime.lookup(file.path) || 'application/octet-stream',
        }));

        const url = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        links.push(url);
      }
    }

    res.status(200).json({ links });
  } catch (err: any) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", detail: err.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
