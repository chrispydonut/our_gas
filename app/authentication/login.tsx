import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { toInternational } from '../../lib/toInternational';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 인증번호 요청
  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('입력 오류', '전화번호를 입력하세요.');
      return;
    }
    const internationalPhone = toInternational(phone);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ phone: internationalPhone });
    setLoading(false);
    if (error) {
      Alert.alert('전송 실패', error.message);
    } else {
      setOtpSent(true);
      Alert.alert('인증번호가 전송되었습니다.');
    }
  };

  // 인증번호로 로그인
  const handleLogin = async () => {
    if (!phone || !code) {
      Alert.alert('입력 오류', '전화번호와 인증번호를 모두 입력하세요.');
      return;
    }
    const internationalPhone = toInternational(phone);
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone: internationalPhone,
      token: code,
      type: 'sms',
    });
    setLoading(false);

    if (error) {
      Alert.alert('로그인 실패', error.message);
    } else {
      // ✅ 세션에서 유저 ID 가져오기
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user.id;

      if (!userId) {
        Alert.alert('에러', '유저 정보를 불러올 수 없습니다.');
        return;
      }

      // ✅ stores 테이블에서 user_id 기준으로 조회
      const { data: stores, error: storeError } = await supabase
        .from('stores')
        .select('*')
        .eq('user_id', userId);

      if (storeError) {
        Alert.alert('에러', '가게 정보 조회 실패: ' + storeError.message);
        return;
      }

      if (!stores || stores.length === 0) {
        // ❗ 가게 정보 없음 → 가게 등록 화면
        router.replace('/add-store1');
      } else {
        // ✅ 가게 정보 있음 → 홈 또는 메인 화면
        router.replace('/');
      }
    }
  };

  // 회원가입 이동
  const handleSignup = () => {
    router.push('/authentication/signup');
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">로그인</Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        placeholder="전화번호 (예: 01012345678 또는 +821012345678)"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        editable={!otpSent}
      />

      {otpSent && (
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
          placeholder="인증번호 입력"
          placeholderTextColor="#999"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
      )}

      {loading && <ActivityIndicator style={{ marginBottom: 16 }} />}

      {!otpSent ? (
        <TouchableOpacity
          onPress={handleSendOtp}
          className="bg-black rounded-lg py-3 mb-4"
          disabled={loading}
        >
          <Text className="text-white text-center font-medium text-base">인증번호 보내기</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-black rounded-lg py-3 mb-4"
          disabled={loading}
        >
          <Text className="text-white text-center font-medium text-base">확인</Text>
        </TouchableOpacity>
      )}

      {/* 구분선 */}
      <View className="flex-row items-center my-4">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="px-2 text-gray-500">또는</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity onPress={handleSignup} className="py-2">
        <Text className="text-center text-[#222] font-medium">회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}
