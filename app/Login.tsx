// app/(auth)/Login.tsx
import * as WebBrowser from "expo-web-browser";
import { View, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { signIn, state } = useContext(AuthContext);

  console.log(state);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
}

// import * as WebBrowser from "expo-web-browser";
// import {
//   makeRedirectUri,
//   useAuthRequest,
//   useAutoDiscovery,
// } from "expo-auth-session";
// import { Text } from "react-native";
// import { Link } from "expo-router";
// WebBrowser.maybeCompleteAuthSession();
// const App = () => {
//   const discovery = useAutoDiscovery(
//     "https://dev-auth.rocketerp.io/realms/RHSTrainingLog"
//   );
//   // Create and load an auth request
//   const [request, result, promptAsync] = useAuthRequest(
//     {
//       clientId: "app",
//       redirectUri: makeRedirectUri({ scheme: "my-scheme", path: "redirect" }),
//       scopes: ["openid", "profile"],
//     },
//     discovery
//   );
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button
//         title="Login!"
//         disabled={!request}
//         onPress={() => promptAsync()}
//       />
//       {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
//       <Link href="/Home" asChild>
//         <Text>Go to tabs</Text>
//       </Link>
//     </View>
//   );
// };
// export default App;
