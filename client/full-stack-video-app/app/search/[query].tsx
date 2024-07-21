import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import EmptyState from "@/components/customs/EmptyState.component";
import { Models } from "react-native-appwrite";
import { useInteractAppWrite } from "@/hooks/useInteractAppWrite";
import VideoCard from "@/components/customs/VideoCard.component";
import { searchPosts } from "@/lib/searchPost";
import QueryHeader from "@/components/customs/QueryHeader.component";
import * as Burnt from "burnt";
const Search = () => {
  const { query } = useLocalSearchParams();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [posts, _, refetch] = useInteractAppWrite<Promise<Models.Document[]>>(
    () => searchPosts(query as string)
  );
  React.useEffect(() => {
    const query = async () => {
      Burnt.alert({
        title: "Search",
        message: `Looking to our database...`,
        preset: "spinner",
        duration: 10000,
      });
      await refetch();
      Burnt.dismissAllAlerts();
    };
    query();
  }, [query]);
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
        ListHeaderComponent={<QueryHeader query={query as string} />}
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

export default Search;
