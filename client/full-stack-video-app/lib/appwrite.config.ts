import { Simonorg_senaVideosDocument } from "@/types/appwrite";
import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

export const AppWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM as string,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECTID as string,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASEID as string,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERCOLLECTIONID as string,
  videoCollectionId: process.env
    .EXPO_PUBLIC_APPWRITE_VIDEOCOLLECTIONID as string,
  storageBucketId: process.env.EXPO_PUBLIC_APPWRITE_STORAGEBUCKETID as string,
};

const client = new Client();
client
  .setEndpoint(AppWriteConfig.endpoint)
  .setProject(AppWriteConfig.projectId)
  .setPlatform(AppWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export {
  AppWriteConfig as config,
  client,
  account,
  avatars,
  databases,
  storage,
};
