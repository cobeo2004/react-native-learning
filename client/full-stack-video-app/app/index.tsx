import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { images } from "@/constants";
import CustomButton from "@/components/customs/CustomButton.component";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/Global.provider";
const HomePage = () => {
  const { isLoading, isLogged } = useGlobalContext!();
  if (!isLoading && isLogged) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center h-full px-4 min-h-[85vh]">
          {/*Logo*/}
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          {/*Dog and Person Card*/}
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          {/*Banner Text*/}
          <View className="mt-5 relative">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Posibility with{" "}
              <Text className="text-secondary-200">Sena</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -right-8 -bottom-2"
              resizeMode="contain"
            />
          </View>
          {/*Description Text*/}
          <Text className="text-sm text-gray-100 text-center font-pregular mt-7">
            Where creativity meets innovation: Embark on a joruney of limitless
            exploration with Sena.
          </Text>
          {/*TouchableOpacity*/}
          <CustomButton
            title="Let's go baby!"
            handlePress={() => {
              //Redirect to Log-in
              router.push("/sign-in");
            }}
            containerStyle="mt-7 w-full"
          />
        </View>
      </ScrollView>
      {/*Device status bar (on top) */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default HomePage;
