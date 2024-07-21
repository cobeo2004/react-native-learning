import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton.component";
import { router } from "expo-router";

type EmptyStateProp = {
  title: string;
  subTitle: string;
};
const EmptyState: React.FC<EmptyStateProp> = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-white mt-2">{title}</Text>
      <Text className="font-pmedium text-sm text-center text-gray-100">
        {subTitle}
      </Text>
      <CustomButton
        title="Create a video"
        handlePress={() => {
          router.push("/create");
        }}
        containerStyle="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
