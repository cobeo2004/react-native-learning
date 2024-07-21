import { View, Text, Image } from "react-native";
import React from "react";
import SearchInput from "./SearchInput.component";
import { images } from "@/constants";
type QueryHeaderProps = {
  query: string;
};
const QueryHeader: React.FC<QueryHeaderProps> = ({ query }) => {
  return (
    <View className="my-6 mx-4">
      <Text className="font-pmedium text-sm text-gray-100">
        Search result for:
      </Text>
      <Text className="text-2xl font-pmedium text-white">{query}</Text>
      <View className="mt-6 mb-8">
        <SearchInput initialQuery={query} />
      </View>
    </View>
  );
};

export default QueryHeader;
