import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CATEGORIES = [
  '전체', '화구 교체', '경보기 교체', '배관 철거', '가스누출 검사', '밸브 교체'
];

const SERVICES = [
  {
    id: 1,
    name: '배관 철거',
    icon: require('../../assets/pipe.png'),
    date: '오늘',
    status: '진행',
  },
  {
    id: 2,
    name: '가스누출 검사',
    icon: require('../../assets/gas.png'),
    date: '2025/04/28',
    status: '취소',
  },
  {
    id: 3,
    name: '밸브 교체',
    icon: require('../../assets/valve.png'),
    date: '2025/04/28',
    status: '완료',
  },
  {
    id: 4,
    name: '밸브 교체',
    icon: require('../../assets/valve.png'),
    date: '2025/03/12',
    status: '완료',
  },
  {
    id: 5,
    name: '화구 교체',
    icon: require('../../assets/burner.png'),
    date: '2025/03/12',
    status: '완료',
  },
];

const STATUS_ICON = {
  '완료': { icon: <Ionicons name="checkmark-circle" size={28} color="#4DD0A1" />, bg: '#E0F7EF' },
  '진행': { icon: <Ionicons name="checkmark-circle" size={28} color="#FFD36F" />, bg: '#FFF7E0' },
  '취소': { icon: <Ionicons name="close-circle" size={28} color="#FF6B6B" />, bg: '#FFEAEA' },
};

export default function MyService() {
  const [selected, setSelected] = useState('전체');
  const router = useRouter();

  // 상태 → 상세화면용 status 매핑
  const statusMap = {
    완료: '완료',
    진행: '요청수락',
    취소: '작업중',
  };

  // 날짜별 그룹핑 + 필터링
  const grouped = SERVICES
    .filter(s => selected === '전체' || s.name.includes(selected.replace('교체', '')))
    .reduce((acc, cur) => {
      acc[cur.date] = acc[cur.date] ? [...acc[cur.date], cur] : [cur];
      return acc;
    }, {} as Record<string, typeof SERVICES>);

  return (
    <View className="bg-white flex-1">
      {/* 상단 헤더 */}
      <View className="pt-20 flex-row items-center justify-between px-5 mb-3">
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold text-[#222]">나의 서비스</Text>
        <View className="w-[28px]" />
      </View>

      {/* 카테고리 필터 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        className='mb-2 mt-5 max-h-[40px]'
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            className={`rounded-2xl px-4 py-2 mr-2 h-[30px] ${selected === cat ? 'bg-[#FF5A36]' : 'bg-[#F3F3F3]'}`}
            onPress={() => setSelected(cat)}
          >
            <Text className={`text-[15px] font-medium ${selected === cat ? 'text-white' : 'text-[#222]'}`}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 서비스 리스트 */}
      <ScrollView className='flex-1'>
        {Object.keys(grouped).map(date => (
          <View key={date}>
            <Text className="text-[#888] text-[14px] font-semibold px-6 mb-2 mt-2">{date}</Text>
            {grouped[date].map(service => (
              <TouchableOpacity
                key={service.id}
                className="flex-row items-center px-6 py-3 bg-white"
                onPress={() => {
                  const mappedStatus = statusMap[service.status as keyof typeof statusMap];
                  router.push(`/my_service/service-detail?status=${mappedStatus}`);
                }}
                activeOpacity={0.8}
              >
                <Image source={service.icon} style={{ width: 38, height: 38, marginRight: 16 }} resizeMode="contain" />
                <Text className="flex-1 text-[17px] font-bold text-[#222]">{service.name}</Text>
                <View style={{ marginLeft: 8 }}>
                  {STATUS_ICON[service.status as keyof typeof STATUS_ICON].icon}
                </View>
              </TouchableOpacity>
            ))}
            {/* 날짜별 구분선 */}
            <View style={{ height: 1, backgroundColor: '#eee', marginHorizontal: 16, marginVertical: 4 }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
