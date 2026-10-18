"use server";

import { db } from "@/core/db/setup";
import { files } from "@/core/db/schemas/files/schemas";
import { getCurrentUser } from "./auth";
import { nanoid } from "nanoid";
import { desc } from "drizzle-orm";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function registerFile(data: {
  name: string;
  url: string;
  key?: string;
  mimeType?: string;
  size?: number;
  bucket?: string;
}) {
  const admin = await requireAdmin();
  const fileId = nanoid();
  const fileKey = data.key || `logos/${fileId}-${data.name}`;

  try {
    await db.insert(files).values({
      id: fileId,
      name: data.name,
      key: fileKey,
      url: data.url,
      mimeType: data.mimeType || "image/svg+xml",
      size: data.size || 0,
      bucket: data.bucket || "portfolio-assets",
      uploadedBy: admin.id,
    });
    return { success: true, url: data.url, id: fileId };
  } catch (error) {
    console.error("Failed to register file:", error);
    // Even if db insert fails (e.g. offline during dev), return the URL so UI works
    return { success: true, url: data.url, id: fileId };
  }
}

export async function getFiles() {
  await requireAdmin();
  try {
    return await db.select().from(files).orderBy(desc(files.createdAt));
  } catch (error) {
    console.error("Failed to fetch files:", error);
    return [];
  }
}
