<template>
  <div id="Signup-page">
    <Header></Header>
    <h2>회원가입 페이지</h2>

    <div class="signup-page">

      <div class="form">
            <form id="register-form" class="register-form" method="post">
              <p id="checkID_msg" v-if="checkemail" style="color: red; font-size: 20px; font-weight: bold;"> 중복된 이메일입니다. 다시 입력 바랍니다. </p>
              <p id="no_inputKorean-msg" v-if="emailAlert" style="color: red; font-size: 20px; font-weight: bold;">영문, 숫자 조합으로 입력하세요.</p>
              <p id="nameAlert-msg" v-if="nameAlert" style="color: red; font-size: 20px; font-weight: bold;"> 이름은 한글만 입력 가능합니다.</p>
              <p id="numAlert-msg" v-if="numAlert" style="color: red; font-size: 20px; font-weight: bold;"> 핸드폰 번호는 숫자만 입력하세요.</p>

              <label for="email_Total">이메일</label><br>
              <input id="emailid" name="emailId" type="text" placeholder="이메일 주소" maxlength="30" v-model="emailId" @change="checkEmail()"
                      @keyup="no_korean($event)">@
              <input id="emailDomain" name="emailDomain" type="text" placeholder="이메일 도메인" v-model="emailDomain" @change="checkEmail()"
                      @keyup="no_korean($event)">

              <select name="select_email" @change="selectEmail($event), checkEmail()" v-model="emailDomain">
                <option value="">선택하세요</option>
                <option value="naver.com" >naver.com</option>
                <option value="gmail.com" >gmail.com</option>
                <option value="hanmail.com" >hanmail.com</option>
                <option value="">직접 입력</option>
              </select>
          <div>

         <label for="user_name" style="margin-top: 20px;">이름</label>
         <input type="text" id="username_r" name="member_name" class="username_r" placeholder="이름을 입력하세요" minlength="2" maxlength="10" v-model="user_name"
                @keyup="only_korean($event)" style="text-align: center">
      </div>
      <div>
        <label for="userpw_r">비밀번호</label>
        <input type="password" id="userpw_r" name="member_pw" class="userpw_r" placeholder="비밀번호를 입력하세요" minlength="8" maxlength="20" v-model="user_password"
                    @change="password_Check()" style="text-align: center">
      </div>
      <div>
        <label for="userpwConfirm">비밀번호 확인</label>
        <input type="password" id="userpwConfirm"  class="userpw" placeholder="비밀번호를 다시한번 입력하세요" maxlength="20" v-model="user_password2"
                    @change="password_Check()" style="text-align: center">
      </div>

      <div>
        <br>
        <label for="usertell">연락처</label>
        <input id="tel_1" type="tel" name='phone1' value="010" placeholder="010" v-model="tell1"
                @keyup="only_number($event)" maxlength="3"/> -
        <input id="tel_2" type="tel" name='phone2' v-model="tell2"
                @keyup="only_number($event)" maxlength="4"/> -
        <input id="tel_3" type="tel" name='phone3' v-model="tell3"
                @keyup="only_number($event)" maxlength="4"/>
      </div>
      <button type="button" @click="register()">가입</button>
      <p class="message">이미 가입하셨습니까? <router-link to="/login">로그인 </router-link></p>
    </form>
      </div>
    </div>
  </div>

</template>
<!--
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
-->
<script scope>


import axios from "axios";
import router from "@/router";

export default {
  name: "Signup-page",
  data() {
    return {
      checkemail : false,
      emailAlert : false,
      nameAlert : false,
      numAlert : false,

      emailDomain : "", //초기값 설정
      emailId : this.emailId,
      user_name : this.user_name,
      user_password : this.user_password,
      user_password2 : this.user_password2,
      tell1 : "010", tell2 : this.tell2, tell3 :this.tell3,

    };
  },
  components: {

  },
  methods: {
    //한글입력방지(이메일)
    no_korean(event) {
      let regExp = /[^0-9a-zA-Z-.-_]/g;
      let ele = event.target;
      if (regExp.test(ele.value)) {
        ele.value = ele.value.replace(regExp, '');
        this.emailId = "";
        this.emailAlert = true;
        setTimeout(() => this.emailAlert = false, 3000);


      }
    },
    //한글만 입력(이름)
    only_korean(event) {
      let regExp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
      let ele = event.target;
      if (regExp.test(ele.value)) {
       /* ele.value = ele.value.replace(regExp, '');*/
/*        this.user_name="";*/
        this.nameAlert = true;
        setTimeout(() => this.nameAlert = false, 3000);
      }
    },
    //숫자만 입력(핸드폰번호)
    only_number(event) {
      let regExp = /[^0-9]/gi;
      let ele = event.target;
      if (regExp.test(ele.value)) {
/*        ele.value = ele.value.replace(regExp, '');*/
        this.numAlert = true;
        setTimeout(() => this.numAlert = false, 3000);
        this.tell1="010";
        this.tell3="";
        this.tell2="";
      }
    },

    selectEmail() {
    },
    register() {
      const emailDomain = event.target.value;

      const user_email = this.emailId +"@"+ this.emailDomain;
      const user_name = this.user_name;
      const user_password = this.user_password;
      const user_password2 = this.user_password2;
      const user_tell = this.tell1 +"-"+ this.tell2 +"-"+ this.tell3;

      //===============회원가입 시 미작성 칸 체크=========================
      if(this.emailId==null || this.emailDomain==null){
        alert("이메일을 입력해주세요");
        return false;
      }
      if(user_name==null){
        alert("이름을 입력해주세요");
        return false;
      }
      if(user_password==null){
        alert("비밀번호를 입력해주세요");
        return false;
      }
      //=====비밀번호 확인도 null 아니도록 구현하기 =====
      if(this.tell1==null || this.tell2==null || this.tell3 ==null){
        alert("연락처를 입력해주세요");
        return false;
      }
      //===============회원가입 시 미작성 칸 체크 끝=========================


      //===============회원가입 시 최소,최대길이 체크=========================
      //이메일 자리수 필터링
      if(this.emailId.length<4){
        alert("이메일은 최소 4자리이상 입력해주세요.");
        return false;
      }
      //이름 자음필터링
      let regExp2 =  /^[가-힣]{2,}$/;
      let ele = this.user_name;
      if (!(regExp2.test(ele))) {
        /*        ele.value = ele.value.replace(regExp, '');*/
      alert("이름은 2-10자리로 입력해주세요");
      return false;
      }

      //이름 자리 수 제한 알림
      if(this.user_name.length>16) {
        alert("이름은 최대 16자리까지 입력가능합니다.");
        return false;
      }
      if(this.user_name.length<2) {
        alert("이름은 최소 2자리  이상이어야 합니다.");
        return false;
      }


      //비밀번호 숫자/문자/특수문자 암호
      let regExp3 =  [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\~!@#$%^&*-_+=,.;:]/];
      let ele2 = this.user_password;
      for(let i=0; i<regExp3.length; i++){
        if (!(regExp3[i].test(ele2))) {
  /*        ele.value = ele.value.replace(regExp, '');*/
        alert("비밀번호는 8~16자리 숫자/문자/특수문자를 포함해야합니다.");
        return false;
        }
      }


      //비밀번호 자리수 제한 알림
      if(this.user_password.length>=20) {
        alert("비밀번호는 최대 20자리까지 입력가능합니다.");
        this.user_password = "";
        return false;
      }else if(this.user_password.length<8) {
        alert("비밀번호는 최소 8자리 이상이어야 합니다.");
        return false;
      }

      //핸드폰 번호 자리수 제한 알림
      if(!(this.tell1=="010" || this.tell1=="011")){
        alert("전화번호는 010, 011 로 시작해야 합니다.");
        return false;
      }
      //핸드폰 번호 중간, 끝자리수 제한 알림
      if(!(this.tell2.length==3 || this.tell2.length==4)){
        alert("핸드폰번호를 확인해주세요");
        return false;
      }
      if(!(this.tell3.length==4)){
        alert("핸드폰번호를 확인해주세요");
        return false;
      }

      //===============회원가입 시 최소,최대길이 체크 끝=========================




      //회원가입 시 비밀번호 , 비밀번호 확인 창 값이 같은지.
      if(!(this.user_password==this.user_password2)) {
        alert("비밀번호가 다릅니다. 다시 입력해주세요.");
        this.user_password="";
        this.user_password2="";
        return false;
      }

      //=============================== 주의 ===================
      // email, tell 의 경우
      // this.emailId 와 this.emailDomain 의 결합으로 된 변수임
      // 따라서 Object 에 담을 때 this 를 붙이면 Undefined 에러 발생 유의
      //=======================================================
      const user_info = new Object();
      user_info.user_email = user_email;
      user_info.user_name = this.user_name;
      user_info.user_password = this.user_password;
      user_info.user_tell = user_tell;
      axios.post('/api/user/signup',user_info)
          .then(res =>{
            alert("회원가입에 성공하셨습니다.");
            router.push('/login');
          }).catch(err => {
          alert("가입에 실패하였습니다. 다시 시도해주세요.");

      })
    },

    async checkEmail() {
      const user_email = this.emailId +"@"+ this.emailDomain;
      const email_id = document.getElementsByName("emailId");
      await axios.post('/api/user/checkemail',
                        {user_email})
           .then(res => {
             if (res.data==0){
               this.checkemail=false;
             }else {
               this.checkemail=true;
               setTimeout(() => this.checkemail = false, 2000);
               this.emailId="";
             }

           }).catch(err => {
           })

     },
    password_Check() {
    //비밀번호 자리수 제한 알람
      if(this.user_password.length>=20) {
        alert("비밀번호는 최대 20자리까지 입력가능합니다.");
        this.user_password = "";
        return false;
      }else if(this.user_password.length<8) {
        alert("비밀번호는 최소 8자리 이상이어야 합니다.");
        return false;
      }

/*      if(this.user_password2.length>=20) {
        alert("비밀번호는 최대 20자리까지 입력가능합니다.");
        this.user_password2 = "";
      }*/
    }
  },

}

</script>

<style scoped>

/* 로그인 CSS 테스트용 */
/*@import url(https://fonts.googleapis.com/css?family=Roboto:300);*/

.signup-page {
  width: 600px;
  height:550px;
  padding: 5% 0 0;
  margin: auto;
  margin-bottom: 300px;

}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  width: 700px;
  /*margin: 0 auto 100px;*/
  margin-left: -55px;
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
  display: block;
}


body {
  background: #FFFFFF;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#emailid{
  position: relative;
  max-width: 290px;
  margin: 0 auto 10px;
  margin-right: 2px;

}
#emailDomain{
  position: relative;
  max-width: 290px;
  margin: 0 auto 10px;
}
#tel_1{
  position: relative;
  max-width: 100px;
  margin: 0 auto 10px;
  text-align: center;
}
#tel_2{
  position: relative;
  max-width: 100px;
  margin: 0 auto 10px;
  text-align: center;
}
#tel_3{
  position: relative;
  max-width: 100px;
  margin: 0 auto 10px;
  text-align: center;
  margin-bottom: 30px;
}

</style>