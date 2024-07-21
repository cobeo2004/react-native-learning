import { View, Text } from "react-native";
import React from "react";

type InfoBoxProps = {
  title: string | number;
  subtitle?: string;
  containerStyle?: string;
  titleStyles: string;
};

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  subtitle,
  containerStyle,
  titleStyles,
}) => {
  return (
    <View className={containerStyle}>
      <Text className={`font-psemibold text-white text-center ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
