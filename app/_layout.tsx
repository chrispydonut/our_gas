import '../global.css';
import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments, Redirect } from 'expo-router';

export const unstable_settings = {
  // 앱 최초 진입 시 'login' 화면을 표시
  initialRouteName: 'login',
};

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  // 앱 시작 시 로그인 화면으로 리다이렉트
  if (!segments.length) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
