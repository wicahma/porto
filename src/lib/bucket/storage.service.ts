"use server";

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import initialiedBucket from "./server";
import { nanoid } from "nanoid";

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "portfolio";

export interface UploadFileResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

export interface DeleteFileResult {
  success: boolean;
  error?: string;
}

/**
 * Generate a unique file path for storage
 */
const generateFilePath = (
  folder: string,
  originalName: string,
  prefix?: string,
): string => {
  const timestamp = Date.now();
  const randomId = nanoid(8);
  const extension = originalName.split(".").pop();
  const sanitizedName = originalName
    .replaceAll(/[^a-zA-Z0-9.-]/g, "_")
    .toLowerCase();

  if (prefix) {
    return `${folder}/${prefix}_${timestamp}_${randomId}.${extension}`;
  }

  return `${folder}/${timestamp}_${randomId}_${sanitizedName}`;
};

/**
 * Upload a file to S3 storage
 */
export const uploadFileToStorage = async (
  file: File,
  folder: "images" | "articles" | "projects",
  prefix?: string,
): Promise<UploadFileResult> => {
  try {
    const client = await initialiedBucket();
    const filePath = generateFilePath(folder, file.name, prefix);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    await client.send(command);

    return {
      success: true,
      filePath: filePath,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Upload HTML content as a file to storage
 */
export const uploadHtmlToStorage = async (
  htmlContent: string,
  fileName: string,
  folder: "articles" | "projects",
): Promise<UploadFileResult> => {
  try {
    const client = await initialiedBucket();
    const filePath = generateFilePath(folder, `${fileName}.html`);

    const buffer = Buffer.from(htmlContent, "utf-8");

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
      Body: buffer,
      ContentType: "text/html",
      Metadata: {
        originalName: fileName,
        uploadedAt: new Date().toISOString(),
      },
    });

    await client.send(command);

    return {
      success: true,
      filePath: filePath,
    };
  } catch (error) {
    console.error("Error uploading HTML:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Delete a file from S3 storage
 */
export const deleteFileFromStorage = async (
  filePath: string,
): Promise<DeleteFileResult> => {
  try {
    const client = await initialiedBucket();

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
    });

    await client.send(command);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Delete multiple files from S3 storage
 */
export const deleteFilesFromStorage = async (
  filePaths: string[],
): Promise<DeleteFileResult> => {
  try {
    const results = await Promise.all(
      filePaths.map((path) => deleteFileFromStorage(path)),
    );

    const hasError = results.some((result) => !result.success);

    if (hasError) {
      return {
        success: false,
        error: "Some files failed to delete",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting files:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
