// components/ProtectedRoute.tsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSegments } from "expo-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!state.isSignedIn && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace("/");
    } else if (state.isSignedIn && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/Home");
    }
  }, [state.isSignedIn, segments]);

  return <>{children}</>;
}
