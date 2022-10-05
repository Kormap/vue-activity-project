<template>
  <div id="Header">
<!--    <h3>header part</h3>-->
    <!-- 이미지 업로드 -->
    <div id="logoImage" style="width:150px; height:50px; float: left;">
<!--      <router-link style=text-decoration:none; to="/mainpage" class="routerBtn">-->
      <a @click="routerHome()" style="color : #3a3131; width: 50px;">
        <img style="width: 150px; height: 100px; margin-top: -20px;" src="https://ifh.cc/g/5YjHFf.png">
      </a>
        <!--      </router-link>-->
    </div>
     <div id="header-right_button">
      <a class="underline-hover-btn" @click="routerLogin()" style="color : #3a3131; width: 50px;"
         v-if="isShow">로그인</a>
      <a class="underline-hover-btn" id="Btn_signup" @click="routerSignup()" style="color : #be0000; width: 70px;"
         v-if="isShow">회원가입</a>
       <a class="underline-hover-btn" @click="goMyprofile()" style="color : #3a3131; width: 150px"
          v-if="!isShow">마이페이지</a>
       <a class="underline-hover-btn" id="Btn_signup" @click="logout()" style="color : #be0000; width: 70px;"
          v-if="!isShow">로그아웃</a>
    </div>


  </div>
</template>

<script scope>


import axios from "axios";

export default {
  name: "Header-component",
  components: {

  },
  data() {
    return {
      isShow : false,
      user_name : this.user_name,
    }
  },
  mounted() {
    this.sessionCheck();
  },
  methods: {
    //라우터 - 회원가입페이지
    routerSignup() {   // 주소 변경 필요
      // this.$router.push('/signup');
      window.location.href = "/signup";
    },
    //라우터 - 로그인 페이지
    routerLogin() {
      // this.$router.push('/login');
      window.location.href = "/login";
    },
    routerHome() {
      window.location.href = "/mainpage";
    },
    sessionCheck(){
      if(sessionStorage.getItem('user_email')==null || sessionStorage.getItem('user_name')==null ){
        this.isShow = true;
        sessionStorage.removeItem('user_email');
        sessionStorage.removeItem('user_name');
      }else {
        sessionStorage.getItem('user_email');
        sessionStorage.getItem('user_name');
        this.user_email = sessionStorage.getItem('user_email');
        this.user_name = sessionStorage.getItem('user_name');
        this.isShow = false;
      }
    },
    logout() {
      sessionStorage.removeItem('user_email');
      sessionStorage.removeItem('user_name');
      this.isShow =true;
      alert("로그아웃 되었습니다.");
      window.location.href = "/login";

      axios.get('/api/user/logout')
          .then(res => {
          }).catch(err => {
      })
    },
    goMyprofile() {
      window.location.href = "/profile";
    },
  }
}

</script>

<style>
#logoImage {
  text-align: left;
}

/* 헤더 우측 파트 */
.header-right-area {
  text-align: right;
}
#header-right_button{
  margin-left: 85%;
  position: relative;
  width: 300px;

}
/* 버튼 css*/
/*@charset "UTF-8";*/
*, *:before, *:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 1.2rem;
  font-family: "Open Sans", sans-serif;
  color: #444;
  background-color: #fff;
  margin: 0;
  padding: 4rem;
  text-align: center;
}
.frame-btn:hover .frame-btn__text {
  color: white;
}
.frame-btn:hover .frame-btn__solid {
  opacity: 1;
  transform: scale(1);
}
.frame-btn:hover .frame-btn__outline--flat .frame-btn__line--tall:before, .frame-btn:hover .frame-btn__outline--flat .frame-btn__line--tall:after {
  transform: scaleY(0);
}
.frame-btn:hover .frame-btn__outline--tall .frame-btn__line--tall:before, .frame-btn:hover .frame-btn__outline--tall .frame-btn__line--tall:after {
  margin: 5px 0;
  height: calc(100% - (5px * 2));
}
.frame-btn:hover .frame-btn__outline--tall .frame-btn__line--flat:before, .frame-btn:hover .frame-btn__outline--tall .frame-btn__line--flat:after {
  transform: scaleX(0);
}
.frame-btn:hover .frame-btn__outline--flat .frame-btn__line--flat:before, .frame-btn:hover .frame-btn__outline--flat .frame-btn__line--flat:after {
  margin: 0 5px;
  width: calc(100% - (5px * 2));
}

.frame-btn:hover .frame-btn__line:before, .frame-btn:hover .frame-btn__line:after {
  transition: 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.underline-hover-btn {
  display: inline-block;
  padding: 1em 0;
  border-radius: 0;
  color: #b2876f;
  margin-top: 0rem;
  margin-right: 0.8rem;
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;

}
.underline-hover-btn:hover {
  color: #b2876f;
}
.underline-hover-btn:hover:before {
  transform: none;
  opacity: 1;
  transition-duration: 0.4s;
}
.underline-hover-btn:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  bottom: 0px;
  background: #d6beb1;
  transform: translateY(6px);
  opacity: 0;
  transition: 1.8s cubic-bezier(0.2, 1, 0.3, 1);
  pointer-events: none;
}

</style>