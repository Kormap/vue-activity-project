<template>
  <div class="login-page">
    <HeaderComponent style="margin-bottom: 100px;"></HeaderComponent>
    <div class="form">
      <div><p id="loginCheck" style="color:red;text-align:center;"></p></div>
      <form class="login-form" name="loginCheckform" id="loginCheckform" method="post">
        <input type="text"  id="userid" name="member_id" class="userid" placeholder="아이디를 입력하세요" maxlength="50" v-model="user_email"/>
        <input type="password" id="userpw" name="member_pw" class="userpw" placeholder="비밀번호를 입력하세요" maxlength="20" v-model="user_password" @keyup.enter="keypress"/>
<!--        <a href="/mainpage" style="color: white">-->
          <button type="button" @click="loginClicked()">로그인</button>
<!--        </a>-->
        <p class="message">회원이 아니십니까? <router-link to="/signup">회원가입 </router-link></p>
        <p class="message">액티비티 컨텐츠 확인을 원하시나요?<a href="/mainpage"> 액티비티 페이지 </a></p>
      </form>
      <section class="test">
        <div id="kakaoLogin" v-on:click="kakaoLoginBtn" >
          <img class="image_titleContainer" v-bind:src="require('/Users/donghyeok/Desktop/My/Virtual Machine/kakaoLoginButton.png')" alt=" "
               style="border-radius: 5px; margin-top: 30px; width: 100px; height: 40px;">
        </div>
      </section>
    </div>

  </div>


</template>
<!-- 카카오 스크립트 -->

<script scope>
import axios from "axios";
import HeaderComponent from "@/components/Header";

export default {
  name: "Login-page",
  mounted() {
    window.Kakao.init('c8f556efe6b205b375a965efa5914689') // Kakao Developers에서 요약 정보 -> JavaScript 키
  },
  data() {
    return {
      user_email : this.user_email,
      user_password : this.user_password,
      user_name : this.user_name,
      kakaoUserInfo : this.property_keys,
    };
  },
  components: {
    HeaderComponent

  },
  methods: {
    loginClicked() {
      axios.post('/api/user/login',
                {user_email: this.user_email, user_password: this.user_password} )
          .then(res =>{
            if(res.data==1){
              this.getUsername();
              sessionStorage.setItem('user_email', this.user_email);
            }else {
              alert("아이디, 비밀번호를 확인해주세요");
            }
          }).catch(err => {
      })
    },
    getUsername(){
        axios.get('/api/user/myinfo')
            .then(res => {
              this.user_name = res.data[0].user_name;
              sessionStorage.setItem('user_name',this.user_name);
              window.location.href = "/mainpage";
            }).catch(err => {
        })
    },
    keypress() {
      this.loginClicked();
    },


    kakaoLoginBtn() {

      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success: function (response) {
            console.log("TOKEN===")
            console.log(response)
            console.log("FINISH===")
          },
          fail: function (error) {
            console.log(error)
          },
        })
        window.Kakao.Auth.setAccessToken(undefined)
      }


      window.Kakao.Auth.login({
        success: function () {
          window.Kakao.API.request({
            url: '/v2/user/me',
            data: {
              property_keys: ["kakao_account.email"
                              ,"kakao_account.profile.thumbnail_image_url"
                              ,"kakao_account.profile.nickname"
                              ,"auth_time"
                             ],
            },

            success: async function (response) {
              console.log(response);
              const kakao_email = response.kakao_account.email.toString();
              const kakao_name = response.kakao_account.profile.nickname;
              console.log("kakao_email = " + kakao_email);
              console.log("kakao_name = " + kakao_name);
              // console.log("kakaoe_amil= "+ response.kakao_account.email.toString());
              //카카오 로그인 API , 스프링 부트 서버 데이터 전달
              axios.post('/api/user/kakaoLogin',
                  { kakaoUserInfo: response, kakao_email: kakao_email } )
                  .then(res =>{
                    console.log(res);
                    console.log(res.data);
                    if(res.data == "TRUE"){
                      sessionStorage.setItem('kakao_email',kakao_email);
                      sessionStorage.setItem('kakao_name',kakao_name);
                      window.location.href = "/mainpage";
                    }
                    else{
                      alert("로그인 인증에 실패하였습니다. 다시 시도해주세요");
                    }
                  }).catch(err => {
              })


            },
            fail: function (error) {
              console.log(error)
            },
          })
        },
        fail: function (error) {
          console.log(error)
        },
      })
    },

  },

}

</script>


<style scoped>
.login-page {
  width: 600px;
  height:550px;
  padding: 10% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 600px;
  /*margin: 0 auto 100px;*/
  margin-left: 80px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 20px 20px 20px 20px / 20px 20px 20px 20px;
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 20px 20px 20px 20px / 20px 20px 20px 20px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background-color: #4CAF50;
  color: #d7fff1;
  width: 100%;
  border: 0;
  padding: 15px;
  font-size: 14px;
/*  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;*/
  cursor: pointer;
  border-radius: 20px 20px 20px 20px / 20px 20px 20px 20px;
}
.form button:hover,.form button:active,.form button:focus {
  background: #77af9c;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
body {
  background: #FFFFFF;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


</style>

<!--
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>

$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

</script>-->
