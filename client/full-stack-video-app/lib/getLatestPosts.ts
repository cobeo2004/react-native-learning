import { Models, Query } from "react-native-appwrite";
import { config, databases } from "./appwrite.config"

export const getLatestPosts = async () => {
    try {
        const { endpoint, platform, projectId, databaseId, videoCollectionId } = config;
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)]);
        return posts.documents as Models.Document[];
    } catch (error) {
        throw new Error((error as { message: string }).message)
    }
}
