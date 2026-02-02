import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import initialiedBucket from "@/lib/bucket/server";

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "portfolio";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        { error: "File path is required" },
        { status: 400 },
      );
    }

    const client = await initialiedBucket();

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filePath,
    });

    const response = await client.send(command);

    if (!response.Body) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const stream = response.Body.transformToWebStream();
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    const headers = new Headers();
    headers.set(
      "Content-Type",
      response.ContentType || "application/octet-stream",
    );
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    if (response.ContentLength) {
      headers.set("Content-Length", response.ContentLength.toString());
    }

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching file from storage:", error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 },
    );
  }
}
