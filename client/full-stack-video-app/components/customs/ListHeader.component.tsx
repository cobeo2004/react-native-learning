import { View, Text, Image } from "react-native";
import React from "react";
import SearchInput from "./SearchInput.component";
import { images } from "@/constants";
import TrendingVideos from "./Trendings.component";
import { useInteractAppWrite } from "@/hooks/useInteractAppWrite";
import { getLatestPosts } from "@/lib/getLatestPosts";
import { useGlobalContext } from "@/context/Global.provider";

const ListHeaderComponent = () => {
  const { user } = useGlobalContext();
  console.log(user);
  const [latestPosts, _, fetch] = useInteractAppWrite(getLatestPosts);
  return (
    <View className="my-6 mx-4 space-y-6">
      <View className="justify-between items-start flex-row mb-6">
        <View>
          <Text className="font-pmedium text-sm text-gray-100">
            Welcome Back
          </Text>
          <Text className="text-2xl font-pmedium text-white">
            {user?.documents[0].username}
          </Text>
        </View>
        <View className="mt-1.5">
          <Image
            source={images.logoSmall}
            className="w-9 h-10"
            resizeMode="contain"
          />
        </View>
      </View>
      <SearchInput />
      <View className="w-full flex-1 pt-5 pb-8">
        <Text className="text-gray-100 text-lg mb-3 font-pregular">
          Latest Videos
        </Text>
        <TrendingVideos posts={latestPosts ?? []} />
      </View>
    </View>
  );
};

export default ListHeaderComponent;
