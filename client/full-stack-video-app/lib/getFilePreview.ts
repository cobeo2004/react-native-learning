import { ImageGravity } from "react-native-appwrite";
import { config, storage } from "./appwrite.config";

export const getFilePreview = async (id: string, type: string) => {
  const { storageBucketId } = config;
  let fileUrl: URL;

  try {
    if (type === "video") fileUrl = storage.getFilePreview(storageBucketId, id);
    else if (type === "image")
      fileUrl = storage.getFilePreview(
        storageBucketId,
        id,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    else throw new Error("Invalid type");

    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};
