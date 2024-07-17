import { account, avatars, config, databases } from "@/lib/appwrite.config";
import { useState } from "react";
import { ID } from "react-native-appwrite";
import { useSignUpValidator } from "./useSignUpValidator";
import * as Burnt from "burnt";
import { signIn } from "@/lib/signIn";

export const useSignUp = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
        userName: ''
    })


    const handleSignUp = async () => {
        const validator = useSignUpValidator(form.userName, form.email, form.password);
        if (validator !== null) {
            setError(validator);
            Burnt.alert({
                title: "Error",
                message: validator,
                preset: "error",
                duration: 2
            });
            return;
        }
        try {
            setLoading(true);
            Burnt.alert({
                title: "Registering",
                message: "You are almost there...",
                preset: "spinner",
                duration: 10
            })
            const newAccount = await account.create(ID.unique(), form.email, form.password, form.userName);
            if (!newAccount) {
                Burnt.dismissAllAlerts();
                Burnt.alert({
                    title: "Error",
                    message: `Error while creating account`,
                    preset: "error",
                    duration: 2
                });
                setError("Account creation failed");
                throw new Error("Account creation failed");
            } else {
                const avatarUrl = avatars.getInitials(form.userName);
                await signIn(form.email, form.password);
                const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
                    accountId: newAccount.$id,
                    email: form.email,
                    userName: form.userName,
                    avatar: avatarUrl
                });
                Burnt.dismissAllAlerts();
                Burnt.alert({
                    title: "Success",
                    message: `Account created successfully`,
                    preset: "done",
                    duration: 2
                });
                return newUser;
            }
        } catch (error) {
            setError(error as string);
            Burnt.dismissAllAlerts();
            Burnt.alert({
                title: "Error",
                message: error as string,
                preset: "error"
            });
            throw new Error(error as string);
        } finally {
            setLoading(false);
        }
    }

    return { form, setForm, error, loading, handleSignUp };


}
