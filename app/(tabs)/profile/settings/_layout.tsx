import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, Stack, useLocalSearchParams } from "expo-router";

import { Button, Pressable } from "react-native";

const StackLayout = () => {
  const { id } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLeft: () => (
            <Button title="Back" onPress={() => router.back()} />
          ),
          // headerRight: () => (
          //   <Pressable onPress={() => router.navigate("/(settings)")}>
          //     <FontAwesome size={20} name="cog" />
          //   </Pressable>
          // ),
        }}
      />
      {/* {/* <Stack.Screen name="add" options={{ title: "Add" }} /> */}
      <Stack.Screen
        name="profile-settings"
        options={{ title: "Profile Settings", headerShown: true }}
      />
      <Stack.Screen
        name="trainer-settings"
        options={{ title: "Trainer Settings", headerShown: true }}
      />
      <Stack.Screen
        name="trainingType-settings"
        options={{ title: "Training Types", headerShown: true }}
      />
    </Stack>
  );
};

export default StackLayout;
