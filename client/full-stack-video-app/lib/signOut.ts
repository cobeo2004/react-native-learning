import { account } from "./appwrite.config"

export const signOut = async () => {
    try {
        return await account.deleteSession('current');
    } catch (error) {
        throw new Error((error as { message: string }).message);
    }
}
