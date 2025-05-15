import React from 'react';
import { router } from 'expo-router';
import { ScrollView, TouchableOpacity, Text } from 'react-native';


export default function AddStore1() {
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      className="bg-white"
    >
      {/* 가게 추가 버튼 (화면 중앙 배치) */}
      <TouchableOpacity
        className="bg-[#FFF2EE] rounded-2xl py-8 px-10 flex-row items-center justify-center"
        onPress={() => router.push('/(tabs)')}
      >
        <Text className="text-[#FF5A36] text-[20px] font-bold mr-2">+</Text>
        <Text className="text-[#FF5A36] text-[16px] font-bold">가게 추가</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
