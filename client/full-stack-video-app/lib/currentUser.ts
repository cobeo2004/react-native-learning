import { Query } from "react-native-appwrite";
import { account, config, databases } from "./appwrite.config"

export const currentUser = async () => {
    try {
        const currAccount = await account.get();
        if (!currAccount) throw Error;
        const currUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [Query.equal('accountId', currAccount.$id)]);
        if (!currUser) throw Error;
        return currUser;
    } catch (error) {
        throw new Error((error as { message: string }).message);
    }
}