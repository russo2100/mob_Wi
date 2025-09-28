
import "react-native-reanimated";
import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SystemBars } from "react-native-edge-to-edge";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const colorScheme = useColorScheme();

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SystemBars style="light" />
        <Stack>
          <Stack.Screen name="(index)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="device/[id]" 
            options={{ 
              headerShown: false,
              presentation: 'modal'
            }} 
          />
          <Stack.Screen 
            name="room/[id]" 
            options={{ 
              headerShown: false,
              presentation: 'modal'
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              headerShown: false,
              presentation: 'modal'
            }} 
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
