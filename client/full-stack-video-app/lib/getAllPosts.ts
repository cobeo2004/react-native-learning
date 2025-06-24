import { Simonorg_senaVideosDocument } from "@/types/appwrite";
import { config, databases } from "./appwrite.config";

export const getAllPosts = async () => {
  try {
    const { endpoint, platform, projectId, databaseId, videoCollectionId } =
      config;
    const posts = await databases.listDocuments<Simonorg_senaVideosDocument>(
      databaseId,
      videoCollectionId
    );
    return posts;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};
