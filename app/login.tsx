import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!phone || !code) {
      Alert.alert('입력 오류', '전화번호와 인증번호를 모두 입력하세요.');
      return;
    }

    // 테스트용 인증번호 체크
    if (code === '1234') {
      Alert.alert(
        '로그인 성공',
        '이제 가게를 추가해주세요.',
        [
          {
            text: '시작하기',
            onPress: () => router.replace('/add-store1')
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('인증 실패', '인증번호가 올바르지 않습니다.');
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">로그인</Text>

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
        onPress={handleLogin}
        className="bg-black rounded-lg py-3 mb-4"
      >
        <Text className="text-white text-center font-medium text-base">확인</Text>
      </TouchableOpacity>

      {/* 구분선 */}
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="px-2 text-gray-500">또는</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity onPress={handleSignup} className="py-2">
        <Text className="text-center text-#222 font-medium">회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}
