import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const KakaoMapScreen = () => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>html, body { margin: 0; padding: 0; height: 100%; }</style>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=4ad19c3f7d84573a0f9f71474e751e88"></script>
    </head>
    <body>
      <div id="map" style="width:100%;height:100%;"></div>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({ position: map.getCenter() });
        marker.setMap(map);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
      />
    </View>
  );
};

export default KakaoMapScreen;
