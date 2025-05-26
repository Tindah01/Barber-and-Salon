import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="customer-login" />
      <Stack.Screen name="customer-signup" />
      <Stack.Screen name="business-login" />
      <Stack.Screen name="business-signup" />
    </Stack>
  );
}