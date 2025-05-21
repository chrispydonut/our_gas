import '../global.css';
import { useEffect, useState } from 'react';
import { Redirect, Stack} from 'expo-router';
import { supabase } from '~/lib/supabase';
import { ActivityIndicator } from 'react-native';

export default function RootLayout() {

  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }
  if (!isLoggedIn) {
    return <Redirect href="/authentication/login" />
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="authentication/login" />
      <Stack.Screen name="authentication/signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
