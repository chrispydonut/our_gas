import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { testSupabaseConnection } from '../lib/supabase';

export default function TestConnection() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null);

  const handleTest = async () => {
    setLoading(true);
    try {
      const testResult = await testSupabaseConnection();
      setResult(testResult);
      
      if (testResult.success) {
        Alert.alert('연결 성공', 'Supabase에 성공적으로 연결되었습니다.');
      } else {
        Alert.alert('연결 실패', `오류: ${testResult.error}`);
      }
    } catch (err) {
      Alert.alert('테스트 실패', '연결 테스트 중 오류가 발생했습니다.');
      console.error('Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      <Text className="text-2xl font-bold mb-8">Supabase 연결 테스트</Text>
      
      <TouchableOpacity
        onPress={handleTest}
        className="bg-blue-500 rounded-lg px-6 py-3 mb-4"
        disabled={loading}
      >
        <Text className="text-white font-medium text-lg">
          {loading ? '테스트 중...' : '연결 테스트'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {result && (
        <View className="mt-4 p-4 rounded-lg bg-gray-100">
          <Text className="text-lg font-medium">
            상태: {result.success ? '성공' : '실패'}
          </Text>
          {result.error && (
            <Text className="text-red-500 mt-2">{result.error}</Text>
          )}
        </View>
      )}
    </View>
  );
} 