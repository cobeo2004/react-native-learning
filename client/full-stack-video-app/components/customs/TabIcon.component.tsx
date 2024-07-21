import { icons } from "@/constants";
import { View, Text, Image } from "react-native";

export const TabIcon: React.FC<{
  icon: any | typeof icons;
  color: string;
  name: string;
  focused: boolean;
}> = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center gap-2">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
    />
    <Text
      className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      style={{ color: color }}
    >
      {name}
    </Text>
  </View>
);
