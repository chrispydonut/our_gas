import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const INQUIRIES = [
  { id: 1, title: '정기계약 이용권 문의', time: '10:25', preview: '(메시지)' },
  { id: 2, title: '밸브 교체 피드백', time: '어제', preview: '(메시지)' },
  { id: 3, title: '결제 문의', time: '2025/04/28', preview: '(메시지)' },
];

export default function Inquiry() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white pt-8">
      {/* 상단 헤더 */}
      <View className="pt-10 flex-row items-center justify-between px-[18px] mb-3">
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Ionicons name="chevron-back" size={30} color="#222" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold text-[#222]">문의하기</Text>
        <TouchableOpacity onPress={() => router.push('/center')}>
          <Ionicons name="create-outline" size={26} color="#222" />
        </TouchableOpacity>
      </View>
      {/* 문의 내역 리스트 */}
      <FlatList
        data={INQUIRIES}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#eee' }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#222' }}>{item.title}</Text>
              <Text style={{ color: '#888', fontSize: 13 }}>{item.time}</Text>
            </View>
            <Text style={{ color: '#888', fontSize: 13, marginTop: 2 }}>{item.preview}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
