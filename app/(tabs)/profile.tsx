import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Pressable, Switch, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Profile() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('010-9876-5432');
  const [email, setEmail] = useState('second_email@naver.com');
  const [store, setStore] = useState('이동간반이 보문점');
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white pt-8">
      {/* 상단 헤더 */}
      <View className="pt-10 flex-row items-center justify-between px-5 mb-3">
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold text-[#222]">프로필</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* 프로필 정보 */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[#FF5A36] text-[18px] font-bold mb-1">홍길동 고객님</Text>
            <View className="flex-row items-center mb-0.5">
              <Feather name="phone" size={15} color="#888" />
              <Text className="ml-1 text-[#888] text-[14px]">010-1234-5678</Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="email" size={15} color="#888" />
              <Text className="ml-1 text-[#888] text-[14px]">ganghoon010@naver.com</Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-[#FF5A36] w-10 h-10 rounded-full items-center justify-center"
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name="pen" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그아웃 버튼 */}
      <View className="px-6 mb-4">
        <TouchableOpacity className="bg-[#FFF2EE] rounded-2xl py-3 items-center flex-row justify-center" onPress={() => router.replace('/login')}>
          <MaterialIcons name="logout" size={20} color="#FF5A36" />
          <Text className="ml-2 text-[#FF5A36] text-[16px] font-bold">로그아웃</Text>
        </TouchableOpacity>
      </View>

      {/* 메뉴 리스트 */}
      <View className="px-6">
        <TouchableOpacity
          className="flex-row items-center justify-between py-3 border-b border-[#F3F3F3]"
          onPress={() => router.push('/my-store')}
        >
          <View className="flex-row items-center">
            <Entypo name="location-pin" size={20} color="#222" />
            <Text className="ml-3 text-[16px] text-[#222]">나의 가게(위치)</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#bbb" />
        </TouchableOpacity>
        <MenuItem icon={<Feather name="gift" size={20} color="#222" />} label="프로모션" />
        <MenuItem icon={<Feather name="credit-card" size={20} color="#222" />} label="결제 수단" />
        <MenuItem icon={<Feather name="help-circle" size={20} color="#222" />} label="고객센터" onPress={() => router.push('/center')} />
      </View>

      {/* 알림 받기 스위치 */}
      <View className="flex-row items-center justify-between px-6 mt-4">
        <Text className="text-[16px] text-[#222]">알림 받기</Text>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#eee", true: "#FF5A36" }}
          thumbColor={isEnabled ? "#fff" : "#fff"}
        />
      </View>

      {/* 가게 정보 변경 모달 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* 어두운 배경 */}
        <Pressable
          className="flex-1 bg-black/30"
          onPress={() => setModalVisible(false)}
        >
          {/* 아래 모달 내용 */}
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl px-6 pt-3 pb-8">
            <View className="items-center mb-3">
              <View className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />
              <Text className="text-[17px] font-bold text-[#222] mb-4">가게 정보 변경</Text>
            </View>
            <View className="mb-3">
              <TextInput
                className="bg-[#F6F6F6] rounded-xl px-4 py-3 mb-3 text-[16px]"
                value={phone}
                onChangeText={setPhone}
                placeholder="전화번호"
                keyboardType="phone-pad"
              />
              <View className="flex-row items-center bg-[#F6F6F6] rounded-xl px-4 py-3 mb-3">
                <MaterialIcons name="email" size={18} color="#bbb" />
                <TextInput
                  className="flex-1 ml-2 text-[16px]"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="이메일"
                  keyboardType="email-address"
                />
              </View>
              <View className="flex-row items-center bg-[#F6F6F6] rounded-xl px-4 py-3">
                <Ionicons name="person-outline" size={18} color="#bbb" />
                <TextInput
                  className="flex-1 ml-2 text-[16px]"
                  value={store}
                  onChangeText={setStore}
                  placeholder="가게명"
                />
              </View>
            </View>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                className="flex-1 items-center py-3 rounded-2xl mr-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-[#888] text-[16px] font-bold">취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 items-center py-3 rounded-2xl bg-[#EB5A36] ml-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-[16px] font-bold">저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

// 메뉴 아이템 컴포넌트
function MenuItem({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-[#F3F3F3]" onPress={onPress}>
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-3 text-[16px] text-[#222]">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#bbb" />
    </TouchableOpacity>
  );
}