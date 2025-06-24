import { Models, Query } from "react-native-appwrite";
import { config, databases } from "./appwrite.config";
import { Simonorg_senaVideosDocument } from "@/types/appwrite";

export const getLatestPosts = async () => {
  try {
    const { endpoint, platform, projectId, databaseId, videoCollectionId } =
      config;
    const posts = await databases.listDocuments<Simonorg_senaVideosDocument>(
      databaseId,
      videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};
