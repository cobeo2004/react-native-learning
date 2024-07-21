import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import React from "react";
import ListHeaderComponent from "@/components/customs/ListHeader.component";
import EmptyState from "@/components/customs/EmptyState.component";
import { Models } from "react-native-appwrite";
import { getAllPosts } from "@/lib/getAllPosts";
import { useInteractAppWrite } from "@/hooks/useInteractAppWrite";
import VideoCard from "@/components/customs/VideoCard.component";

const Home = () => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [posts, fetching, refetch] = useInteractAppWrite(getAllPosts);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList<Models.Document>
        data={posts as unknown as Models.Document[]}
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
        ListHeaderComponent={<ListHeaderComponent />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found!"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
