import { Stack } from 'expo-router';

export default function BusinessLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="customers" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}