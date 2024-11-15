// @ts-check
import React, { createContext, useEffect, useMemo, useReducer } from "react";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isSignedIn: boolean;
  accessToken: string | null;
  idToken: string | null;
  userInfo: UserInfo | null;
}

interface UserInfo {
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  roles: string[];
}

interface AuthAction {
  type: "SIGN_IN" | "USER_INFO" | "SIGN_OUT";
  payload?: any;
}

const publicUrl =
  (process.env.EXPO_PUBLIC_KEYCLOAK_URL as string) ||
  "https://dev-auth.rocketerp.io/realms/RHSTrainingLog";

const initialState: AuthState = {
  isSignedIn: false,
  accessToken: null,
  idToken: null,
  userInfo: null,
};

const AuthContext = createContext<{
  initialized: boolean;
  state: AuthState;
  signIn: () => void;
  signOut: () => Promise<void>;
  hasRole: (role: any) => boolean;
  user: UserInfo | null;
}>({
  initialized: false,
  state: initialState,
  signIn: () => {},
  signOut: async () => {},
  hasRole: (role: any) => false,
  user: null,
});

const AuthProvider = ({ children }: any) => {
  const discovery = useAutoDiscovery(publicUrl);
  // Create and load an auth request
  const redirectUri = makeRedirectUri({
    scheme: "myapp",
    path: "Home",
  });
  const [request, result, promptAsync] = useAuthRequest(
    {
      clientId: "app",
      responseType: "code", // Add this
      redirectUri: redirectUri,
      scopes: ["openid", "profile"],
    },
    discovery
  );

  // In AuthProvider, add this effect
  // useEffect(() => {
  //   const loadStoredAuth = async () => {
  //     try {
  //       const storedAuth = await AsyncStorage.getItem("auth");
  //       if (storedAuth) {
  //         const authData = JSON.parse(storedAuth);

  //         dispatch({ type: "SIGN_IN", payload: authData });
  //       }
  //     } catch (error) {
  //       console.error("Error loading stored auth:", error);
  //     }
  //   };

  //   loadStoredAuth();
  // }, []);
  useEffect(() => {
    const storedAuth = async () => {};
  }, []);

  const [authState, dispatch] = useReducer(
    (previousState: AuthState, action: AuthAction): AuthState => {
      switch (action.type) {
        case "SIGN_IN":
          // console.log("Signing in:", action.payload);
          AsyncStorage.setItem("auth", JSON.stringify(action.payload));
          return {
            ...previousState,
            isSignedIn: true,
            accessToken: action.payload.access_token,
            idToken: action.payload.id_token,
          };
        case "USER_INFO":
          AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
          return {
            ...previousState,
            userInfo: {
              username: action.payload.preferred_username,
              givenName: action.payload.given_name,
              familyName: action.payload.family_name,
              email: action.payload.email,
              roles: action.payload.roles,
            },
          };
        case "SIGN_OUT":
          return {
            ...initialState,
          };
        default:
          return previousState;
      }
    },
    initialState
  );

  const authContext = useMemo(
    () => ({
      initialized: authState.accessToken !== null && authState.idToken !== null,
      state: authState,
      signIn: async () => {
        promptAsync();
      },
      signOut: async () => {
        try {
          const idToken = authState.idToken;
          await fetch(
            `${publicUrl}/protocol/openid-connect/logout?id_token_hint=${idToken}`
          );
          // @ts-ignore
          dispatch({ type: "SIGN_OUT" });
        } catch (e) {
          console.warn(e);
        }
      },
      /**
       * @param {String} role
       * @returns Boolean
       */
      hasRole: (role: any) => authState.userInfo?.roles.indexOf(role) != -1,
      user: authState.userInfo,
    }),
    [authState, promptAsync]
  );

  /**
   * Get access-token when authorization-code is available
   */
  useEffect(() => {
    const getToken = async ({
      code,
      codeVerifier,
      redirectUri,
    }: {
      code: string;
      codeVerifier: string;
      redirectUri: string;
    }) => {
      try {
        const formData: { [key: string]: string } = {
          grant_type: "authorization_code",
          client_id: process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID as string,
          code: code,
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
        };
        const formBody = [];
        for (const property in formData) {
          var encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(formData[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }

        const response = await fetch(
          `${publicUrl}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody.join("&"),
          }
        );
        if (response.ok) {
          const payload = await response.json();

          dispatch({ type: "SIGN_IN", payload });
        }
      } catch (e) {
        console.warn(e);
      }
    };
    if (result?.type === "success") {
      const { code } = result.params;
      getToken({
        code,
        codeVerifier: request?.codeVerifier || "",
        redirectUri,
      });
    } else if (result?.type === "error") {
      console.warn("Authentication error: ", result.error);
    }
  }, [dispatch, redirectUri, request?.codeVerifier, result]);

  /**
   * Get user-info when signing in completed
   */
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const accessToken = authState.accessToken;
        const response = await fetch(
          `${publicUrl}/protocol/openid-connect/userinfo`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken,
              Accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const payload = await response.json();
          // @ts-ignore
          dispatch({ type: "USER_INFO", payload });
        }
      } catch (e) {
        console.warn(e);
      }
    };
    if (authState.isSignedIn) {
      getUserInfo();
    }
  }, [authState.accessToken, authState.isSignedIn, dispatch]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
