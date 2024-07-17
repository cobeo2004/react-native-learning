import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/Form.component";
import CustomButton from "@/components/CustomButton.component";
import { Link, router } from "expo-router";
import * as Burnt from "burnt";
import { useSignInValidator } from "@/hooks/useSignInValidator";
import { signIn } from "@/lib/signIn";
const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = useSignInValidator(form.email, form.password);
  const handleSignIn = async () => {
    if (validate !== null)
      Burnt.alert({
        title: "Error",
        message: validate,
        preset: "error",
        duration: 2,
      });
    else {
      setIsSubmitting(true);
      Burnt.alert({
        title: "Registering",
        message: "Almost there...",
        preset: "spinner",
        duration: 100,
      });
      try {
        console.log("form", form.email, form.password);
        await signIn(form.email, form.password);
        //Global context

        Burnt.dismissAllAlerts();
        router.replace("/home");
      } catch (error) {
        Burnt.dismissAllAlerts();
        Burnt.alert({
          title: "Error",
          message: (error as { message: string }).message,
          preset: "error",
          duration: 2,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-3xl text-white font-psemibold mt-10">
            Log in!
          </Text>
          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e as string })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({ ...form, password: e as string })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign-in"
            containerStyle="mt-7"
            handlePress={handleSignIn}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account ?{" "}
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                <Text>Sign up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInPage;
