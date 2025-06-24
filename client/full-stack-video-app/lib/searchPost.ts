import { Models, Query } from "react-native-appwrite";
import { config, databases } from "./appwrite.config";
import { Simonorg_senaVideosDocument } from "@/types/appwrite";

export const searchPosts = async (query: string) => {
  try {
    const { databaseId, videoCollectionId } = config;
    const posts = await databases.listDocuments<Simonorg_senaVideosDocument>(
      databaseId,
      videoCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};
