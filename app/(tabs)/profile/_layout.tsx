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
          title: "Profile",
          headerRight: () => (
            <Pressable onPress={() => router.navigate("/profile/settings")}>
              <FontAwesome size={20} name="cog" />
            </Pressable>
          ),
        }}
      />
      {/* {/* <Stack.Screen name="add" options={{ title: "Add" }} /> */}
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;
