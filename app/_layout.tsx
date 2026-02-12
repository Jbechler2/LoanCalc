import { LoanProvider } from "@/context/LoanContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LoanProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LoanProvider>
  )
}
