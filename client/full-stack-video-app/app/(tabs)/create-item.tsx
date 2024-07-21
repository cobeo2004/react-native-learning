import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import FormField from "@/components/customs/Form.component";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/customs/CustomButton.component";
import * as DocumentPicker from "expo-document-picker";
import * as Burnt from "burnt";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/Global.provider";
import { createVideo } from "@/lib/createPost";

const CreateItem = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState<{
    title: string;
    video: unknown | null;
    thumbnail: unknown | null;
    prompt: string;
  }>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const togglePicker = async (selType: "video" | "image") => {
    const res = await DocumentPicker.getDocumentAsync({
      type:
        selType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!res.canceled) {
      if (selType === "image") setForm({ ...form, thumbnail: res.assets[0] });
      if (selType === "video") setForm({ ...form, video: res.assets[0] });
    } else {
      setTimeout(() => {
        Burnt.alert({
          title: "Document Picked",
          message: JSON.stringify(res, null, 2),
          preset: "heart",
        });
      }, 100);
    }
  };

  const handleUpload = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Burnt.alert({
        title: "Error",
        message: "Please fill all fields",
        preset: "error",
        duration: 3,
      });
      return;
    }
    setUploading(true);
    try {
      Burnt.alert({
        title: "Uploading",
        preset: "spinner",
        duration: 100,
      });
      await createVideo({ userId: user?.documents[0].$id!, ...form });

      Burnt.dismissAllAlerts();
      Burnt.alert({
        title: "Success",
        message: "Video uploaded successfully",
        preset: "done",
        duration: 2,
      });
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (error) {
      Burnt.dismissAllAlerts();
      Burnt.alert({
        title: "Error while uploading",
        message: (error as { message: string }).message,
        preset: "error",
      });
    } finally {
      Burnt.dismissAllAlerts();
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a good title..."
          handleChangeText={(e) => {
            setForm({ ...form, title: e as string });
          }}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => togglePicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: (form.video as any).uri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => togglePicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: (form.thumbnail as any).uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file...
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt that is used for creating this video..."
          handleChangeText={(e) => {
            setForm({ ...form, title: e as string });
          }}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Publish"
          handlePress={handleUpload}
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateItem;
