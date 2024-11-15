// app/(auth)/Login.tsx
import { View, Button, Text, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { router } from "expo-router";

export default function Login() {
  const { initialized, state, signIn } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  console.log("Login", initialized);

  useEffect(() => {
    // Set a timeout to give the root layout time to render
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timeout); // Clear the timeout on unmount
  }, []);

  useEffect(() => {
    if (initialized && state && isReady) {
      console.log("Navigating to Home");
      router.push("/(tabs)/trainings");
    } else {
      signIn();
    }
  }, [initialized, state, isReady]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
