import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useSegments } from "expo-router";

export default function TabLayout() {
  const segment: string[] = useSegments();

  const hideTabBar = segment.includes("edit");
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#15803d" }}>
      <Tabs.Screen
        name="trainings"
        options={{
          title: "Trainings",
          headerShown: false,
          tabBarStyle: {
            display: hideTabBar ? "none" : "flex",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
