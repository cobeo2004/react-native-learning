import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import InfoBox from "./InfoBox.component";
import { Models } from "react-native-appwrite";
import { signOut } from "@/lib/signOut";
type ProfileHeaderProps = {
  userInfo: Models.DocumentList<Models.Document> | null;
  userPosts: Models.Document[];
  onLogOut: () => void;
};
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userInfo,
  userPosts,
  onLogOut,
}) => {
  return (
    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
      <TouchableOpacity className="w-full items-end mb-10" onPress={onLogOut}>
        <Image
          source={icons.logout}
          resizeMode="contain"
          className="w-6 h-6 "
        />
      </TouchableOpacity>
      <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
        <Image
          source={{ uri: userInfo?.documents[0].avatar }}
          className="w-[90%] h-[90%] rounded-lg"
          resizeMode="cover"
        />
      </View>
      <InfoBox
        title={userInfo?.documents[0].username}
        containerStyle="mt-5"
        titleStyles="text-xl"
      />

      <View className="mt-5 flex-row">
        <InfoBox
          title={userPosts.length || 0}
          subtitle="Posts"
          containerStyle="mr-10"
          titleStyles="text-xl"
        />
        <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-lg" />
      </View>
    </View>
  );
};

export default ProfileHeader;
