import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

export default function KakaoMapView() {
  const webRef = useRef(null);

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_JAVASCRIPT_KEY&autoload=false"></script>
  </head>
  <body style="margin:0;">
    <div id="map" style="width:100vw; height:100vh;"></div>
    <script>
  window.ReactNativeWebView?.postMessage("🟡 HTML 로드 시작");

  setTimeout(() => {
    if (!window.kakao) {
      window.ReactNativeWebView?.postMessage("❌ kakao object 없음");
      return;
    }

    window.ReactNativeWebView?.postMessage("🔄 kakao object 존재함");

    kakao.maps.load(function () {
      const container = document.getElementById('map');
      if (!container) {
        window.ReactNativeWebView?.postMessage("❌ container 없음");
        return;
      }

      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };

      try {
        const map = new kakao.maps.Map(container, options);
        window.ReactNativeWebView?.postMessage("✅ 지도 생성 성공");
      } catch (e) {
        window.ReactNativeWebView?.postMessage("❌ 지도 생성 중 오류: " + e.message);
      }
    });
  }, 500);
</script>

  </body>
</html>
`;


  return (
    <WebView
      ref={webRef}
      originWhitelist={['*']}
      source={{ html }}
      style={styles.map}
      domStorageEnabled={true}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      javaScriptEnabled={true}
      onMessage={(event) => {
        console.log('📩 WebView 메시지:', event.nativeEvent.data);
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
