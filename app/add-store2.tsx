import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import KakaoMapView from '../components/KakaoMapView';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

const KAKAO_REST_API_KEY = '96f486d6b8d281305787e1210c64ed4e'; 

export default function AddStore2() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

  const router = useRouter();

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

  const searchPlaces = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      const res = await fetch(  
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`,
        {
          headers: {
            Authorization: `KakaoAK 96f486d6b8d281305787e1210c64ed4e`,
          },
        }
      );
      const json = await res.json();
      setResults(json.documents || []);
    } catch (e) {
      console.error('장소 검색 실패:', e);
    }
    setLoading(false);
  };

  const handleSelectPlace = (place: any) => {
    setAddress(place.road_address_name || place.address_name);
    setName(place.place_name);
    setMarker({ lat: parseFloat(place.y), lng: parseFloat(place.x) });
    setResults([]);
  };

  return (
    <View style={{ flex: 1 }}>
      <KakaoMapView onMapTouch={() => {}} />
    </View>
  );
}