import { router, Stack, useLocalSearchParams } from "expo-router";

import { Button } from "react-native";

const StackLayout = () => {
  const { id } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Trainings",
          headerRight: () => (
            <Button title="Add" onPress={() => router.push("/trainings/add")} />
          ),
        }}
      />
      <Stack.Screen name="add" options={{ title: "Add" }} />
      <Stack.Screen name="[id]/edit" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;
