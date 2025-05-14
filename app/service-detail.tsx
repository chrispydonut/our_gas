import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';

type Status = '완료' | '요청수락' | '작업중';

export default function ServiceDetail() {
  const router = useRouter();
  const { status = '완료' } = useLocalSearchParams<{ status?: Status }>();
  const [showModal, setShowModal] = useState(false);

  const statusConfig = {
    완료: {
      bgColor: 'bg-[#E6F4EA]',
      title: '서비스 완료',
      desc: '요청하신 서비스가 성공적으로\n완료되었습니다.',
    },
    요청수락: {
      bgColor: 'bg-[#FEFBEA]',
      title: '요청 수락됨',
      desc: '요청하신 서비스를 처리하기 위해\n준비하고 있습니다.',
    },
    작업중: {
      bgColor: 'bg-[#EAF5FE]',
      title: '작업 시행 중',
      desc: '요청하신 서비스에 대해 작업이\n진행 중입니다.',
    },
  }[status as Status];

  const stepList = [
    { label: '서비스 요청', date: '04/24', time: '19:43' },
    { label: '요청 수락', date: '04/24', time: '19:51' },
    { label: '서비스 준비', date: '04/27', time: '19:53' },
    { label: '작업 시행 중', date: '04/28', time: '19:57' },
    { label: '서비스 완료', date: '04/28', time: '20:53' },
  ];

  const stepIndexMap = {
    '요청수락': 1,
    '작업중': 3,
    '완료': 4,
  };
  const currentStep = stepIndexMap[status as keyof typeof stepIndexMap] ?? 0;

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* 상단 헤더 */}
      <View className="flex-row items-center justify-between px-4 pt-16 pb-3 bg-white border-b border-[#eee]">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold text-[#222]">세부정보</Text>
        <View className="w-7" />
      </View>

      {/* 상태 안내 박스 */}
      <View className={`p-4 flex-row items-center ${statusConfig.bgColor}`}>
        <View className="flex-1">
          <Text className="text-[#222] font-bold text-[18px] p-3">{statusConfig.title}</Text>
          <Text className="text-[#222] text-[12px] p-3">{statusConfig.desc}</Text>
        </View>
        <Image source={require('../assets/detail.png')} className="w-18 h-18" resizeMode="contain" />
      </View>

      {/* 가게 정보 */}
      <View className="mx-4 mt-5 mb-2">
        <Text className="text-[15px] text-[#222] mb-1 pl-3">이동간반이 효자본점</Text>
        <View className="flex-row items-center mt-0.5">
          <Text className="text-[#222] text-[12px] mb-3 pl-3">경북 포항시 남구 효성로 15번길 5-1</Text>
          <Ionicons name="location-sharp" size={16} color="#EB5A36" className="ml-1 mb-3" />
        </View>
      </View>

      {/* 상태 라인 위 */}
      <View className="h-px bg-[#E0E0E0] mx-0 mb-2.5" />

      {/* 상태 + 모달 버튼 */}
      <TouchableOpacity className="flex-row items-center mx-4" onPress={() => setShowModal(true)}>
        <Ionicons name="calendar-outline" size={16} color="#888" className="mr-[6px] p-3" />
        <Text className="text-[#222] text-[12px]">{statusConfig.title} : 2025/04/28, 20:53</Text>
        <Ionicons name="chevron-forward" size={16} color="#EB5A36" className="ml-1" />
      </TouchableOpacity>

      {/* 상태 라인 아래 */}
      <View className="h-2 bg-[#E0E0E0] mx-0 my-2.5" />

      {/* 요청 리스트 */}
      <View className="bg-white rounded-2xl mx-0 px-0 py-0 overflow-hidden">
        <View className="flex-row items-center px-4 pt-4 pb-2">
          <Text className="font-bold text-[18px] text-[#222] flex-1">요청 리스트</Text>
          <Text className="text-[#888] text-[13px]">1개</Text>
        </View>
        <View className="h-px bg-[#F0F0F0] mx-0" />
        <View className="flex-row items-center px-4 py-3">
          <Image source={require('../assets/burner.png')} className="w-12 h-12 mr-3" resizeMode="contain" />
          <View className="flex-1">
            <Text className="font-bold text-[16px] text-[#222]">화구 교체 서비스</Text>
            <View className="flex-row items-center mt-0.5">
              <Text className="text-[#888] text-[13px]">1열 1구</Text>
              <View className="bg-[#FFF2EE] rounded-md px-2 py-0.5 ml-1.5">
                <Text className="text-[#EB5A36] font-bold text-[13px]">x1</Text>
              </View>
            </View>
          </View>
          <Text className="font-bold text-[15px] text-[#222]">25,000원</Text>
        </View>
        <TouchableOpacity className="bg-[#FFF2EE] rounded-md mx-4 mb-4 py-2 items-center">
          <Text className="text-[#EB5A36] font-bold text-[13px]">요청사항 자세히 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 전체 요청 금액 */}
      <View className="bg-white flex-row items-center justify-between mt-0 mx-0 border-t border-[#E0E0E0] py-4 px-4">
        <Text className="text-[#222] text-[15px] font-bold">전체 요청</Text>
        <View className="flex-row items-center">
          <Text className="text-[#EB5A36] font-bold text-[17px]">25,000원</Text>
          <TouchableOpacity className="ml-1 p-1" />
        </View>
      </View>

      {/* 회색 하단 라인 */}
      <View className="h-px bg-[#E0E0E0] mx-0" />

      {/* 요청 처리 기록 모달 */}
      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl pt-6 pb-10 px-6">
            {/* 모달 헤더 */}
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text className="text-[#E64B32] text-[14px]">닫기</Text>
              </TouchableOpacity>
              <Text className="text-[#222] text-[16px]">요청 처리 기록</Text>
              <View className="w-9" />
            </View>

            <View className="h-px bg-[##DBDBDB] -mx-6" />

            {/* 서비스 ID */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#222] text-[14px] pt-4">서비스 처리 ID</Text>
              <Text className="text-[#222] font-bold text-[14px] pt-4">M2Z4-VVY2</Text>
            </View>

            <View className="h-2 bg-[#F6F6F5] -mx-6 mb-8" />

            {/* 타임라인 리스트 */}
            {stepList.slice().reverse().map((step, reversedIdx) => {
              const originalIdx = stepList.findIndex(s => s.label === step.label);
              const isActive = originalIdx === currentStep;
              const dotColor = isActive ? '#FF5A36' : '#ccc';
              const boxColor = isActive ? '#FFF2EE' : '#F6F6F6';
              const textColor = isActive ? '#222' : '#888';

              return (
                <View key={reversedIdx} className="flex-row items-start">
                  {/* 날짜/시간 */}
                  <View className="w-14 items-end mr-2">
                    <Text className="text-[#222] text-[13px] font-medium">{step.date}</Text>
                    <Text className="text-[#999] text-[12px]">{step.time}</Text>
                  </View>
            
                  {/* 타임라인 */}
                  <View className="flex-col justify-start items-center mr-3">
                    <View className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: dotColor }} />
                    {reversedIdx < stepList.length - 1 && (
                      <View className="w-[2px] h-20" style={{ backgroundColor: '#E0E0E0' }} />
                    )}
                  </View>
            
                  {/* 상태 박스 */}
                  <View className="w-[70%] py-5 rounded-md" style={{ backgroundColor: boxColor }}>
                    <Text className="text-[14px] font-bold pl-3" style={{ color: textColor }}>
                      {step.label}
                    </Text>
                  </View>
                </View>
              );
            })}            
          </View>
        </View>
      </Modal>
    </View>
  );
}
