import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F3F4F6" },
        }}
      >
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen name="login" options={{ animation: "fade" }} />
        <Stack.Screen
          name="register"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </>
  );
}
