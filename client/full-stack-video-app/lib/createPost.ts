import { ID, Models } from "react-native-appwrite";
import { config, databases } from "./appwrite.config";
import { uploadFile } from "./uploadFile";

export const createVideo = async (data: {
    userId: string;
    title: string;
    video: unknown | null;
    thumbnail: unknown | null;
    prompt: string;
}) => {
    try {
        const { databaseId, videoCollectionId } = config;
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(data.thumbnail, 'image'),
            uploadFile(data.video, 'video')
        ]);

        const newPost = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
            title: data.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            promt: data.prompt,
            creator: data.userId
        })

        return newPost;
    } catch (error) {
        throw new Error((error as { message: string }).message);
    }
}
