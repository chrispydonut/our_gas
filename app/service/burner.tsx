import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

const ITEMS = [
  { id: 1, name: '1열 1구', price: 15000 },
  { id: 2, name: '1열 1구', price: 25000 },
  { id: 3, name: '2열 2구', price: 30000 },
  { id: 4, name: '2열 2구', price: 40000 },
  { id: 5, name: '3열 3구', price: 50000 },
];

export default function BurnerReplaceScreen() {
  const [counts, setCounts] = useState(Array(ITEMS.length).fill(0));
  const router = useRouter();

  const handleCount = (idx: number, diff: number) => {
    setCounts(prev =>
      prev.map((c, i) => (i === idx ? Math.max(0, c + diff) : c))
    );
  };

  const total = counts.reduce((sum, c, i) => sum + c * ITEMS[i].price, 0);
  const anySelected = counts.some(c => c > 0);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-white">
        {/* 상단 헤더 */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#222]">화구교체</Text>
          <TouchableOpacity onPress={() => router.push('/notification/page')}>
            <Ionicons name="notifications-outline" size={26} color="#222" />
          </TouchableOpacity>
        </View>

        {/* 아이템 리스트 */}
        <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 24 }}>
          {ITEMS.map((item, idx) => (
            <View
              key={item.id}
              className="flex-row items-center bg-white rounded-2xl border border-[#eee] px-4 py-3 mb-3"
            >
              {/* 이미지 자리 */}
              <View className="w-16 h-16 bg-[#F3F6FA] rounded-xl items-center justify-center mr-4">
                <Image source={require('../../assets/burner.png')} resizeMode="contain" />
              </View>
              {/* 정보 */}
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-[#222] mb-2">{item.name}</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    className="w-7 h-7 rounded-full bg-[#FADCD2] items-center justify-center mr-2"
                    onPress={() => handleCount(idx, -1)}
                  >
                    <Text className="text-[#EB5A36] text-xl font-bold">-</Text>
                  </TouchableOpacity>
                  <Text className="text-[16px] font-bold text-[#222] w-6 text-center">{counts[idx]}</Text>
                  <TouchableOpacity
                    className="w-7 h-7 rounded-full bg-[#FADCD2] items-center justify-center ml-2"
                    onPress={() => handleCount(idx, 1)}
                  >
                    <Text className="text-[#EB5A36] text-xl font-bold">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* 가격 */}
              <Text className="text-[15px] font-bold text-[#222] ml-2">{item.price.toLocaleString()}원</Text>
            </View>
          ))}
        </ScrollView>

        {/* 전체 합계 및 신청 버튼 */}
        <View className="px-5 pb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#888] text-[15px]">전체</Text>
            <Text className="text-[18px] font-bold text-[#EB5A36]">{total.toLocaleString()} 원</Text>
          </View>
          <TouchableOpacity
            className={anySelected ? "bg-[#EB5A36] rounded-[28px] py-5 items-center" : "bg-[#FADCD2] rounded-[28px] py-5 items-center"}
            onPress={() => anySelected && router.push('/payment')}
            disabled={!anySelected}
          >
            <Text className="text-white text-[16px] font-bold">화구교체 신청</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
