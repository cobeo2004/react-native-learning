import { account } from "./appwrite.config";

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error((error as { message: string }).message);
    }
}
