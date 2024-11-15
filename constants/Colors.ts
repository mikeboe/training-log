/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#15803d",
    tabIconDefault: "#15803d",
    tabIconSelected: tintColorLight,
    listSectionBackground: "#d1d5db",
  },
  dark: {
    text: "#ECEDEE",
    background: "#111827",
    tint: tintColorDark,
    icon: "#15803d",
    tabIconDefault: "#15803d",
    tabIconSelected: tintColorDark,
    listSectionBackground: "#1f2937",
  },
};
