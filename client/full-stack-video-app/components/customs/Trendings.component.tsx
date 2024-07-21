import { icons } from "@/constants";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, Image, ViewToken } from "react-native";
import * as Animatable from "react-native-animatable";
import { Models } from "react-native-appwrite";

type TrendingVideoProps = { posts: any };
type TrendingItemProps = { activeItem: any; item: Models.Document };

const ZoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};

const ZoomOut = {
  0: { scale: 1.1 },
  1: { scale: 0.9 },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? (ZoomIn as any) : (ZoomOut as any)}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if ((status as AVPlaybackStatusSuccess).didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: item.thumbnails }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const TrendingVideos: React.FC<TrendingVideoProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<unknown | null>(posts[1]);
  const viewableChanged = (info: {
    viewableItems: ViewToken<any>[];
    changed: ViewToken<any>[];
  }) => {
    if (info.viewableItems.length > 0) {
      setActiveItem(info.viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id.toString()}
      renderItem={({ item, index }) => (
        <TrendingItem activeItem={activeItem ?? {}} item={item} />
      )}
      onViewableItemsChanged={viewableChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default TrendingVideos;
