import { config, databases } from "./appwrite.config"

export const getAllPosts = async () => {
    try {
        const { endpoint, platform, projectId, databaseId, videoCollectionId } = config;
        const posts = await databases.listDocuments(databaseId, videoCollectionId);
        return posts.documents;
    } catch (error) {
        throw new Error((error as { message: string }).message)
    }
}
