<template>
  <div id="Location_MAP_API">
    <div id="map" style="width:500px;height:400px;"></div>
  </div>
</template>

<!--카카오 지도 API / appkey - 발급받은 JavaScript Key -->
<!--현재 설정 :  현재 location 을 읽어 마커에 표시 -->
<script scope>
export default {
  name: "Location_MAP_API",
  components: {

  },

  data() {
    return {
      map: null,
    }
  },
  mounted() {
    window.kakao && window.kakao.maps
        ? this.initMap()
        : this.addKakaoMapScript();
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
          "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=462d988620110902f1dee22e569cb5ef";
      document.head.appendChild(script);
    },
    initMap() {
      var mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var mapOption = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {

          var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도

          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);

        });

      } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
            message = 'geolocation을 사용할수 없어요..'

        displayMarker(locPosition, message);
      }

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
      function displayMarker(locPosition, message) {

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: locPosition
        });

        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
        });

        // 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
      }
    },

  },
}

</script>

<style>

</style>
