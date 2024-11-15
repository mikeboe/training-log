import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  Pressable,
  SectionList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Settings({ lightColor, darkColor }: any) {
  const sectionBackground = useThemeColor(
    { light: lightColor, dark: darkColor },
    "listSectionBackground"
  );

  return (
    <ThemedView style={styles.container}>
      <SectionList
        sections={[
          {
            title: "Account",
            data: [
              { title: "Profile", action: "/profile-settings" },
              { title: "Logout", action: "/logout" },
            ],
          },
          {
            title: "Configuration",
            data: [
              {
                title: "Trainers",
                action: "/profile/settings/trainer-settings",
              },
              {
                title: "Training Types",
                action: "/profile/settings/trainingType-settings",
              },
            ],
          },
        ]}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.navigate(item.action)}>
            <View style={styles.listItem}>
              <ThemedText>{item.title}</ThemedText>
              <FontAwesome size={12} name="chevron-right" />
            </View>
          </Pressable>
        )}
        renderSectionHeader={({ section }) => (
          <ThemedText
            style={{ backgroundColor: sectionBackground, ...styles.list }}
            type="subtitle"
          >
            {section.title}
          </ThemedText>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  list: {
    padding: 16,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
