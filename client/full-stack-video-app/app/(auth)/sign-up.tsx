import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/Form.component";
import CustomButton from "@/components/CustomButton.component";
import { Link, router } from "expo-router";
import { useSignUpValidator } from "@/hooks/useSignUpValidator";
import * as Burnt from "burnt";
import { signUp } from "@/lib/signUp";

const SignUpPage = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = useSignUpValidator(form.userName, form.email, form.password);
  const handleSignUp = async () => {
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
        title: "Sign up",
        message: "Almost there...",
        preset: "spinner",
        duration: 100,
      });
      try {
        const res = await signUp(form.email, form.password, form.userName);
        //Global context
        Burnt.dismissAllAlerts();
        Burnt.alert({
          title: "Success",
          message: "Account created successfully",
          preset: "done",
          duration: 2,
        });
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
            Sign up!
          </Text>
          <FormField
            title="Username"
            placeholder="Enter your username"
            value={form.userName}
            handleChangeText={(e) =>
              setForm({ ...form, userName: e as string })
            }
            otherStyles="mt-10"
          />
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
            title="Sign-up"
            containerStyle="mt-7"
            handlePress={handleSignUp}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already got one ?{" "}
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                <Text>Sign in</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;
