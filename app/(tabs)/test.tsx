import { Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function MyProfileInfo() {
  const [profile, setProfile] = useState<{ id: string, phone: string | null, default_store_id: string | null } | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('id, phone, default_store_id')
        .eq('id', user.id)
        .single()

      if (error) console.error(error)
      else setProfile(data)
    }

    fetchProfile()
  }, [])

  if (!profile) return <Text>불러오는 중...</Text>

  return (
    <View style={{ padding: 20 }}>
      <Text>유저 ID: {profile.id}</Text>
      <Text>전화번호: {profile.phone || '없음'}</Text>
      <Text>기본 매장 ID: {profile.default_store_id || '없음'}</Text>
    </View>
  )
}
