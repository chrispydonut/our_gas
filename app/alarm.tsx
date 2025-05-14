import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

const OPTIONS = [
  'LPG 경보기',
  'LNG(도시가스) 경보기',
  '그 외',
];

export default function AlarmReplace() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [extra, setExtra] = useState('');
  const [showModal, setShowModal] = useState(false);

  const activeColor = '#EB5A36';
  const inactiveColor = '#FFBDBD';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white pt-8">
        {/* 상단 헤더 */}
        <View className="pt-10 flex-row items-center justify-between px-5 mb-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#222]">경보기 교체</Text>
          <TouchableOpacity onPress={() => router.push('/notification-center')}>
            <Ionicons name="notifications-outline" size={26} color="#222" />
          </TouchableOpacity>
        </View>

        {/* 선택 옵션 */}
        <View className="px-4">
          {OPTIONS.map((opt, idx) => {
            const isActive = selected === idx;
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => setSelected(idx)}
                className={`flex-row items-center rounded-2xl px-4 py-5 mb-4 border ${isActive ? 'border-[#EB5A36]' : 'border-[#eee]'}`}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isActive ? 'radio-button-on' : 'radio-button-off'}
                  size={22}
                  color={isActive ? '#EB5A36' : '#bbb'}
                  style={{ marginRight: 12 }}
                />
                <Text className="text-[17px] text-[#222]">{opt}</Text>
              </TouchableOpacity>
            );
          })}

          {/* 추가 요청사항 */}
          <TextInput
            className="w-full min-h-[56px] h-32 bg-[#F6F7FB] rounded-2xl px-4 py-4 text-[15px] text-[#888] mt-1"
            placeholder="추가 요청사항을 입력해주세요.."
            placeholderTextColor="#bbb"
            value={extra}
            onChangeText={setExtra}
            multiline
          />
        </View>

        {/* 하단 버튼 */}
        <View className="absolute left-0 right-0 bottom-14 items-center">
          <TouchableOpacity
            className="w-[90%] rounded-[28px] py-5 items-center"
            style={{ backgroundColor: selected !== null ? activeColor : inactiveColor }}
            activeOpacity={0.8}
            onPress={() => setShowModal(true)}
          >
            <Text className="text-white text-[16px] font-bold">경보기 교체 신청</Text>
          </TouchableOpacity>
        </View>

        {/* 모달 */}
        <Modal visible={showModal} transparent animationType="fade">
          <View className="flex-1 bg-black/15 justify-center items-center">
            <View className="w-[85%] bg-white rounded-3xl items-center py-9 px-5 shadow shadow-black/10 elevation-8">
              <Ionicons name="checkmark-circle" size={56} color="#4CAF50" className="mb-3" />
              <Text className="text-[20px] font-bold text-[#222] mb-2">감사합니다.</Text>
              <Text className="text-[15px] text-[#888] mb-6 text-center">
                서비스가 성공적으로 접수되었습니다.
              </Text>
              <TouchableOpacity
                className="w-full bg-[#EB5A36] rounded-[28px] py-5 items-center"
                onPress={() => {
                  setShowModal(false);
                  router.replace('/two');
                }}
                activeOpacity={0.85}
              >
                <Text className="text-white font-bold text-[16px]">나의 서비스 확인하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
