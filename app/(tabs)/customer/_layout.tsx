import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="rewards" />
      <Stack.Screen name="qrcode" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}