import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F3F4F6" },
        }}
      >
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen
          name="(auth)/login/index"
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="(auth)/register/index"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </QueryClientProvider>
  );
}