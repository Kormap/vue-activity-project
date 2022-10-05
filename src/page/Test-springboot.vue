
<template>

  <div>
    <br><br><br><br>
    <button @click="load()">get(스프링부트) - 로드 시 콘솔에 출력</button>
    <br><br>
    <div id="demo">
      <button @click="submitBtn()">post(스프링부트)</button>
    </div>


  </div>

</template>

<script>

//axios 라이브러리 import
import axios from 'axios'

export default {
  name: 'TestVueExaxios',

  data() {
    return {


    };
  },

  mounted() {
   this.load();
   this.contentList();
  },

  methods: {
    //유저 정보 관련 테스팅
    load() {
      axios.get('/api/user/list')
          .then(res => {
        console.log(res.data);
      });
    },
    submitBtn() {
      let email="test@naver.com";
      let password="1234";
      axios.post('/api/user/input', {email,password})
          .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    //컨텐츠 조회 관련 테스팅
    contentList() {
      axios.get('api/content/list')
          .then(res =>{
            console.log(res);
          }).catch(err => {
        console.log(err);
      });
    }
  },
};
</script>

<style lang="scss" scoped>

</style>