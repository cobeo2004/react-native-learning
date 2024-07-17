import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import React from "react";

const CustomButton: React.FC<{
  title: string;
  handlePress?: (event: GestureResponderEvent) => void;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
}> = ({ title, handlePress, containerStyle, textStyle, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress ?? (() => {})}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${
        containerStyle ?? ""
      } ${isLoading ? "opacity-50" : ""}`}
    >
      <Text
        className={`text-primary font-psemibold text-lg ${textStyle ?? ""}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
