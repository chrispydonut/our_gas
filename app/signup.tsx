import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSignup = () => {
    if (!phone || !code) {
      Alert.alert('입력 오류', '전화번호와 인증번호를 모두 입력하세요.');
      return;
    }

    // 테스트용 인증번호 체크
    if (code === '1234') {
      Alert.alert(
        '회원가입 성공',
        '회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.',
        [{ text: '확인', onPress: () => router.replace('/login') }],
        { cancelable: false }
      );
    } else {
      Alert.alert('인증 실패', '인증번호가 올바르지 않습니다.');
    }
  };

  // 로그인 화면으로 돌아가기
  const handleBack = () => {
    router.back(); // 또는 router.replace('/login')
  };

  return (
    <View className="flex-1 bg-white">
      {/* 상단 뒤로가기 */}
      <View className="absolute top-14 left-4 z-10">
        <TouchableOpacity onPress={handleBack} className="flex-row items-center">
          <Text className="text-black">&lt; 로그인 화면으로</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center p-6">
        <Text className="text-3xl font-bold mb-8 text-center">회원가입</Text>

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
          placeholder="전화번호 (예: 01012345678)"
          placeholderTextColor="#999"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
          placeholder="인증번호 입력"
          placeholderTextColor="#999"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />

        <TouchableOpacity
          onPress={handleSignup}
          className="bg-black rounded-lg py-3"
        >
          <Text className="text-white text-center font-medium text-base">확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
