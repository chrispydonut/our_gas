import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

export default function Center() {
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요, 무엇을 도와드릴까요?', from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: input, from: 'me' }
    ]);
    setInput('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd?.();
    }, 100);
  };

  return (
    <View className="flex-1 bg-white pt-8">
      <Stack.Screen options={{ headerShown: false }} />
      {/* 상단 헤더 */}
      <View className="pt-10 flex-row items-center justify-between px-5 pb-2">
        <TouchableOpacity onPress={() => router.replace('/(tabs)/contact')}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold text-[#222]">고객센터</Text>
        <View style={{ width: 28 }} />
      </View>
      {/* 채팅 메시지 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            alignItems: item.from === 'me' ? 'flex-end' : 'flex-start',
            paddingHorizontal: 16,
            marginVertical: 4,
          }}>
            <View style={{
              backgroundColor: item.from === 'me' ? '#EB5A36' : '#F6F7FB',
              borderRadius: 16,
              paddingVertical: 10,
              paddingHorizontal: 14,
              maxWidth: '80%',
            }}>
              <Text style={{ color: item.from === 'me' ? 'white' : '#222', fontSize: 15, lineHeight: 22 }}>{item.text}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 12, flexGrow: 1 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd?.()}
      />
      {/* 입력창 */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View 
          className="flex-row items-center p-3 bg-white mb-8"
        >
          <Ionicons name="add" size={24} color="#222" style={{ marginRight: 8 }} />
          <View style={{ flex: 1, backgroundColor: '#F6F7FB', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 }}>
            <TextInput
              placeholder="메시지를 입력해주세요."
              value={input}
              onChangeText={setInput}
              style={{ fontSize: 15, color: '#222' }}
              multiline
              onSubmitEditing={handleSend}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity onPress={handleSend} style={{ marginLeft: 8 }}>
            <Ionicons name="arrow-up-circle" size={28} color={input.trim() ? '#EB5A36' : '#ccc'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
