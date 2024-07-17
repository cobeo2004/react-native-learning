import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ProfilePage</Text>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
