import { supabase } from '../../lib/supabase';

async function requestOtp(phone: string) {
  if (!phone) return { error: "전화번호를 입력하세요" };
  const { error } = await supabase.auth.signInWithOtp({ phone });
  if (error) {
    // 실패 시: 에러메시지 리턴
    return { error: error.message };
  }
  // 성공 시: 인증번호 입력 단계로 이동
  return { success: true };
}
