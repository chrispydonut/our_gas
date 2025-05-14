import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

const notificationsToday = [
  {
    icon: <MaterialIcons name="local-offer" size={24} color="#FFC107" />,
    title: '프로모션 알림',
    desc: '프로모션을 받을 수 있습니다.',
    time: '11:10',
    bg: '#FFF7E0',
  },
  {
    icon: <FontAwesome5 name="credit-card" size={22} color="#4DD0E1" />,
    title: '카드 연결 성공',
    desc: '결제 정보가 성공적으로 등록되었습니다.',
    time: '14:20',
    bg: '#E0F7FA',
  },
  {
    icon: <MaterialIcons name="miscellaneous-services" size={24} color="#4DD0A1" />,
    title: '서비스 시작',
    desc: '신청하신 "화구교체" 서비스가 진행중입니다.',
    time: '21:19',
    bg: '#E0F7EF',
  },
];

const notificationsWeek = [
  {
    icon: <Ionicons name="close-circle" size={24} color="#FF6B6B" />,
    title: '서비스 취소',
    desc: '"밸브 교체"에 대한 서비스가 취소되었습니다.',
    date: '2025/04/12',
    bg: '#FFEAEA',
  },
  {
    icon: <Ionicons name="person-circle-outline" size={24} color="#4DD0E1" />,
    title: '계정 정보 업데이트',
    desc: '가게 정보가 성공적으로 업데이트 되었습니다.',
    date: '2025/03/05',
    bg: '#E0F7FA',
  },
  {
    icon: <Ionicons name="checkmark-circle" size={24} color="#4DD0A1" />,
    title: '서비스 완료',
    desc: '"가스누출 검사"에 대한 서비스가 완료되었습니다.',
    date: '2024/12/23',
    bg: '#E0F7EF',
  },
];

export default function NotificationCenter() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="pt-6 flex-1 bg-white">
        {/* 상단 헤더 */}
        <View className="pt-12 flex-row items-center justify-between px-5 pb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#222]">알림센터</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          {/* 오늘 */}
          <Text className="text-[#888] text-[15px] font-semibold mt-6 mb-2 px-6">오늘</Text>
          {notificationsToday.map((item, idx) => (
            <View key={idx} className="flex-row items-center px-6 py-3">
              <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: item.bg }}>
                {item.icon}
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-[#222]">{item.title}</Text>
                <Text className="text-[14px] text-[#555]">{item.desc}</Text>
              </View>
              <Text className="text-[13px] text-[#888] ml-2">{item.time}</Text>
            </View>
          ))}

          {/* 구분선 */}
          <View className="h-[1px] bg-[#eee] my-3 mx-6" />

          {/* 일주일 */}
          <Text className="text-[#888] text-[15px] font-semibold mb-2 px-6">일주일</Text>
          {notificationsWeek.map((item, idx) => (
            <View key={idx} className="flex-row items-center px-6 py-3">
              <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: item.bg }}>
                {item.icon}
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-[#222]">{item.title}</Text>
                <Text className="text-[14px] text-[#555]">{item.desc}</Text>
              </View>
              <Text className="text-[13px] text-[#888] ml-2">{item.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
