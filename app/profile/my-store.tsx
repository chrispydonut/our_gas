import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

const STORES = [
  { name: '이동간반이 효자본점', address: '경북 포항시 남구 효성로 15번길 5-1' },
  { name: '경주보문점', address: '경북 경주시 보문로 549' },
];

export default function MyStoreScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  const activeColor = '#EB5A36';
  const inactiveColor = '#FFBDBD';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-white">
        {/* 상단 헤더 */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#222]">나의 가게</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* 가게 리스트 */}
        <ScrollView className="px-5" contentContainerStyle={{ paddingBottom: 24 }}>
          {STORES.map((store, idx) => (
            <TouchableOpacity
              key={store.name}
              className="bg-white rounded-2xl border border-[#eee] px-4 py-3 mb-3 flex-row items-center justify-between"
              onPress={() => setSelected(idx)}
              activeOpacity={0.8}
            >
              <View>
                <Text className="text-[16px] font-bold text-[#222] mb-1">{store.name}</Text>
                <Text className="text-[13px] text-[#888]">{store.address}</Text>
              </View>
              <View
                className={`w-6 h-6 rounded-full border-2 ${selected === idx ? 'border-[#FF5A36]' : 'border-[#ccc]'} items-center justify-center`}
              >
                {selected === idx && (
                  <View className="w-3.5 h-3.5 rounded-full bg-[#FF5A36]" />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* 가게 추가 버튼 */}
          <TouchableOpacity
            className="bg-[#FFF2EE] rounded-2xl py-3 items-center flex-row justify-center mt-2"
            onPress={() => router.push('/add-store2')}
          >
            <Text className="text-[#FF5A36] text-[20px] font-bold mr-2">+</Text>
            <Text className="text-[#FF5A36] text-[16px] font-bold">가게 추가</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 하단 적용 버튼 */}
        <View className="absolute left-0 right-0 bottom-14 items-center">
          <TouchableOpacity
            className={`w-[90%] rounded-[28px] py-5 items-center ${
              selected === null ? 'bg-[#FADCD2]' : 'bg-[#EB5A36]'
            }`}
            disabled={selected === null}
            activeOpacity={0.8}
            onPress={() => router.replace('/profile/my-store')}
          >
            <Text className="text-white text-[16px] font-bold">적용</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}