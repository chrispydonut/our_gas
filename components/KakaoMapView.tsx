import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

export default function KakaoMapView() {
  const webRef = useRef(null);

  const html = `
<!DOCTYPE html> 
<html style="height:100%;">
  <head>
    <meta charset="utf-8" />
    <title>KakaoMap Load</title>
    <style>
      html, body, #map {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
      }
    </style>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=4ad19c3f7d84573a0f9f71474e751e88&autoload=false"></script>
  </head>
  <body>
    <div id="map"></div>
    <script>
      window.ReactNativeWebView?.postMessage("🟡 HTML 로드 시작");

      kakao.maps.load(function () {
        try {
          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780),
            level: 3,
          };
          const map = new kakao.maps.Map(container, options);
          window.ReactNativeWebView?.postMessage("✅ 지도 생성 성공");
        } catch (e) {
          window.ReactNativeWebView?.postMessage("❌ 지도 생성 오류: " + e.message);
        }
      });
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
      javaScriptEnabled={true}
      domStorageEnabled={true}
      mixedContentMode="always"
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
