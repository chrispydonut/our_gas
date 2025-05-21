import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function Center() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState<string | null>(null); // userId state!
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const ADMIN_ID = 'f0887d78-02cc-4e94-a9a5-76baf8bac9f4';

  useEffect(() => {
    const init = async () => {
      // 1. 유저 정보 가져오기
      const { data: authData } = await supabase.auth.getUser();
      const userIdValue = authData.user?.id;
      if (!userIdValue) return;
      setUserId(userIdValue);

      // 2. 내 프로필에서 default_store_id(내 가게 id) 가져오기
      const { data: profile } = await supabase
        .from('profiles')
        .select('default_store_id')
        .eq('id', userIdValue)
        .single();
      const STORE_ID = profile?.default_store_id;

      // 3. 기존 conversation 찾기
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', userIdValue)
        .maybeSingle();

      let convId = existing?.id;
      if (!convId && STORE_ID) {
        // 4. 없으면 admin_id, store_id까지 같이 저장
        const { data: created } = await supabase
          .from('conversations')
          .insert({
            user_id: userIdValue,
            admin_id: ADMIN_ID,
            store_id: STORE_ID
          })
          .select()
          .single();
        convId = created.id;
      }
      setConversationId(convId);

      if (!convId) return;

      // 5. 메시지 불러오기
      const { data: initialMsgs } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at');
      setMessages(initialMsgs || []);

      // 6. 실시간 채널 구독
      const channel = supabase
        .channel('user-chat-realtime')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${convId}`,
        }, (payload) => {
          setMessages(prev => [...prev, payload.new]);
          setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    init();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !conversationId || !userId) return;
  
    // 메시지 insert + insert된 데이터 바로 받아오기
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: userId,
        content: input.trim(),
      })
      .select()
      .single();
  
    // conversation.updated_at 갱신
    await supabase.from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);
  
    setInput('');
  
    // insert된 메시지를 바로 state에 추가!
    if (data) {
      setMessages(prev => [...prev, data]);
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
    }
  };
  

  // userId 아직 없으면 렌더 X (권장)
  if (!userId) return null;

  return (
    <View className="flex-1 bg-white pt-8">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="pt-10 flex-row items-center justify-between px-5 pb-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold text-[#222]">고객센터</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`px-4 my-1 ${item.sender_id === userId ? 'items-end' : 'items-start'}`}
          >
            <View
              className={`rounded-2xl py-2 px-3 max-w-[80%] ${item.sender_id === userId ? 'bg-[#EB5A36]' : 'bg-[#F6F7FB]'}`}
            >
              <Text className={`text-[15px] leading-[22px] ${item.sender_id === userId ? 'text-white' : 'text-[#222]'}`}>
                {item.content}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 12, flexGrow: 1 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd?.()}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="flex-row items-center p-3 bg-white mb-8">
          <Ionicons name="add" size={24} color="#222" className="mr-2" />
          <View className="flex-1 bg-[#F6F7FB] rounded-full px-4 py-1.5">
            <TextInput
              placeholder="메시지를 입력해주세요."
              value={input}
              onChangeText={setInput}
              className="text-[15px] text-[#222]"
              multiline
              onSubmitEditing={handleSend}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity onPress={handleSend} className="ml-2">
            <Ionicons name="arrow-up-circle" size={28} color={input.trim() ? '#EB5A36' : '#ccc'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
