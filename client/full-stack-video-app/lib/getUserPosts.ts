import { Query } from "react-native-appwrite";
import { config, databases } from "./appwrite.config"

export const getUserPosts = async (userId: string) => {
    try {
        const { endpoint, platform, projectId, databaseId, videoCollectionId } = config;
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.equal("creator", userId)]);
        return posts.documents;
    } catch (error) {
        throw new Error((error as { message: string }).message)
    }
}
