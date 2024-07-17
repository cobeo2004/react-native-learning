import { Account, Avatars, Client, Databases } from "react-native-appwrite";

export const AppWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.simonorg.sena',
    projectId: '6697624c000101edc371',
    databaseId: '66976373001be3929a11',
    userCollectionId: '6697638c002fe349c0b1',
    videoCollectionId: '669763a0003ab0c1e83d',
    storageBucketId: '669764900025770612b1'
};

const client = new Client();
client
    .setEndpoint(AppWriteConfig.endpoint)
    .setProject(AppWriteConfig.projectId)
    .setPlatform(AppWriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export { AppWriteConfig as config, client, account, avatars, databases };
