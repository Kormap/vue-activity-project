
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  //ESLint 에러 무시 (assigned a value but never used  no-unused-vars)
  lintOnSave: false,
/* outputDir: "../src/main/resources/static",*/
    // 빌드 타겟 디렉토리
       /*Vue.js 클라이언트 페이지 구성 변경 시 매번 스프링부트에서 빌드해야하고,
       Spring Boot 의 resources/static 으로 이동시켜줘야함, 번거로움
   */

  /*
  Proxy - 연걸점이 없거나 보안상 이유로 직접 통신할 수 없는 외부 네트워크들을 간접적으로 연결시켜주는 역할
   */
  devServer: {
    proxy: {
      '/api': {
        // '/api' 주소로 입력이 들어오면 포트 8081(스프링 서버의 포트번호를 8081로 설정함)로 보낸다.
        // 로컬, dev 서버 분리 파일 : .env.local, .env.dev
        target: process.env.VUE_APP_IP.concat(process.env.VUE_APP_PORT),
        // target: 'http://localhost:8081',
        changeOrigin: true // cross origin 허용
                           //서로 다른 출처의 리소스를 공유. / CORS(Cross-Origin Resource Sharing)
      }
    }
  }
};
