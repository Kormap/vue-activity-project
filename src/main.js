import Vue from 'vue';
import App from './App.vue';
//라우터
import router from './router/index.js';
//부트스트랩
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//폰트 어썸
import '@fortawesome/fontawesome-free/js/all.js'
//fort-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue);
library.add(
    fasHeart,
    farHeart
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//전역필터 숫자->콤마
Vue.filter('content_price', function(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})
// new Vue({})

//이미지 슬라이드
// import slideShow from "@/page/JS/slideShow.js";
// Vue.use(slideShow);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

