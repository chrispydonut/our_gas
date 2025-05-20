import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="admin-service"
        options={{
          title: '서비스 관리',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />, 
        }}
      />
      <Tabs.Screen
        name="admin-store"
        options={{
          title: '가게 관리',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="construct-outline" size={size} color={color} />, 
        }}
      />
      <Tabs.Screen
        name="admin-contact"
        options={{
          title: '문의하기',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} />, 
        }}
      />

      {/* 상세화면 등의 탭 숨기기 */}
      <Tabs.Screen
        name="[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
