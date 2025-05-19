import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import KakaoMapView from '../components/KakaoMapView';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const KAKAO_REST_API_KEY = '96f486d6b8d281305787e1210c64ed4e';

export default function AddStore2() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        headers: { Authorization: `KakaoAK 96f486d6b8d281305787e1210c64ed4e` },
      });
      const json = await res.json();
      const addressName =
        json.documents?.[0]?.road_address?.address_name || json.documents?.[0]?.address?.address_name;
      if (addressName) setAddress(addressName);
    } catch (e) {
      console.warn('역지오코딩 실패:', e);
    }
  };

  const searchPlaces = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(address)}`,
        {
          headers: { Authorization: `KakaoAK 96f486d6b8d281305787e1210c64ed4e` },
        }
      );
      const json = await res.json();
      const first = json.documents?.[0];
      if (first) {
        setAddress(first.road_address_name || first.address_name);
        setName(first.place_name);
        setMarker({ lat: parseFloat(first.y), lng: parseFloat(first.x) });
      }
    } catch (e) {
      console.warn('장소 검색 실패:', e);
    }
    setLoading(false);
  };

  const saveStore = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user.id;

    const { error } = await supabase.from('stores').insert([
      {
        user_id: userId,
        name,
        address,
      },
    ]);

    if (!error) {
      router.replace('/profile/my-store');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        {/* 상단 헤더 */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2 bg-white">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#222]">나의 가게</Text>
          <View style={{ width: 28 }} />
        </View>


        {/* 지도 */}
        <KakaoMapView
          onMapTouch={(lat, lng) => {
            setMarker({ lat, lng });
            reverseGeocode(lat, lng);
          }}
          marker={marker ?? undefined}
        />

        {/* 하단 입력 영역 */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-6 pb-8 rounded-t-2xl shadow-lg"
          style={{ minHeight: 260 }}
        >
          <Text className="font-bold text-base text-[18px] mb-2 text-center text-[#222]">위치 정보</Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-2 text-base"
            placeholder="가게 위치 (주소 검색)"
            value={address}
            onChangeText={setAddress}
            onSubmitEditing={searchPlaces}
          />

          {loading && <ActivityIndicator className="mb-2" />}

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
            placeholder="가게 이름"
            value={name}
            onChangeText={setName}
          />

          <TouchableOpacity
            className={`rounded-full py-4 items-center ${name.trim() && address.trim() ? 'bg-[#FF5A36]' : 'bg-[#FADCD2]'}`}
            onPress={name.trim() && address.trim() ? saveStore : undefined}
            activeOpacity={name.trim() && address.trim() ? 0.8 : 1}
          >
            <Text className="text-white font-bold text-base">저장</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
