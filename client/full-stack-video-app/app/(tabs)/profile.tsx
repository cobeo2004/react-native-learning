import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import React from "react";
import EmptyState from "@/components/customs/EmptyState.component";
import { Models } from "react-native-appwrite";
import { useInteractAppWrite } from "@/hooks/useInteractAppWrite";
import VideoCard from "@/components/customs/VideoCard.component";
import { getUserPosts } from "@/lib/getUserPosts";
import { useGlobalContext } from "@/context/Global.provider";
import ProfileHeader from "@/components/customs/ProfileHeader.component";
import { signOut } from "@/lib/signOut";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext!();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [userProfile, _, refetch] = useInteractAppWrite(() =>
    getUserPosts(user?.documents[0].$id as string)
  );
  React.useEffect(() => {
    const query = async () => {
      await refetch();
    };
    query();
  }, [user]);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList<Models.Document>
        data={userProfile as unknown as Models.Document[]}
        keyExtractor={(item) => (item.$id ?? null).toString()}
        renderItem={({ index, item }) => {
          return (
            <VideoCard
              video={{
                title: item.title,
                thumbnail: item.thumbnails,
                video: item.video,
                creator: {
                  username: item.creator.username,
                  avatar: item.creator.avatar,
                },
              }}
            />
          );
        }}
        ListHeaderComponent={
          <ProfileHeader
            onLogOut={async () => {
              await signOut();
              setUser(null);
              setIsLogged(false);
              router.replace("/sign-in");
            }}
            userInfo={user}
            userPosts={userProfile as unknown as Models.Document[]}
          />
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found!"
            subTitle="No videos found for this result!"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
