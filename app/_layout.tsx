import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { migrateDbIfNeeded } from "@/db/migrations";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SQLiteProvider databaseName="db1.db" onInit={migrateDbIfNeeded}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ProtectedRoute>
            <ActionSheetProvider>
              <Stack screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="(modals)"
                  options={{
                    headerShown: true,
                    presentation: "fullScreenModal",
                    animation: "slide_from_bottom",
                  }}
                  // options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="+not-found"
                  options={{ headerShown: true }}
                />
              </Stack>
            </ActionSheetProvider>
          </ProtectedRoute>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SQLiteProvider>
    </AuthProvider>
  );
}
