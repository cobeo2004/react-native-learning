import { ID } from "react-native-appwrite";
import { config, storage } from "./appwrite.config";
import { getFilePreview } from "./getFilePreview";

export const uploadFile = async (file: any, type: string) => {

    const { storageBucketId } = config;
    if (!file) return;

    const { mimeType, ...rest } = file;


    const asset = { type: mimeType, ...rest }


    try {
        const uploadedFile = await storage.createFile(storageBucketId, ID.unique(), asset);
        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        throw new Error((error as { message: string }).message);
    }
}
