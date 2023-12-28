import AWS from "aws-sdk";
import uniqid from "uniqid";

const BUCKET_NAME = "bfmimageholder";
const s3 = new AWS.S3({
  accessKeyId: "AKIAQ4F2NXYFPQBPRNIX",
  secretAccessKey: "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",
});

/**
 * Uploads an image to AWS S3 and returns the unique file name.
 *
 * @param {File} image - The image file to be uploaded.
 * @returns {string} The unique file name of the uploaded image.
 */

export default function s3ImageUplaod(image) {
  let regex = new RegExp("[^.]+$");
  let extension = image.name.match(regex);

  const uniqId = uniqid();
  let uniqueFileName = uniqId + "." + extension[0];

  const params = {
    Bucket: BUCKET_NAME,
    Key: uniqueFileName,
    Body: image,
  };

  s3.upload(params, (err) => {
    console.log("s3 upload error: ", err);
  });

  return uniqueFileName;
}