import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => ({ ufsUrl: file.url })),
  videoUploader: f({
    video: {
      maxFileSize: "16MB",
      maxFileCount: 1,
      // Accept only video mime types
      // You can add accept: ["video/mp4", "video/webm"] if needed
    },
  }).onUploadComplete(async ({ file }) => ({ ufsUrl: file.url })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;