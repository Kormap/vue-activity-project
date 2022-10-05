<template>
  <div id="Myprofile-page">

    <div id="Nav-component">
      <Nav></Nav>
    </div>

    <div id="MypageComponent">
      <MypageComponent></MypageComponent>
    </div>


    <div id="user_info">
      <div id="form" class="form">
        <h1 class="title" style="font-size: 30px;">  내 정보</h1>
        <div><p id="checkID" style="color:red;text-align:center;"></p></div>
        <form id="register-form" class="register-form" method="post">
<!--          <p id="no_inputKorean-msg" v-if="emailAlert" style="color: red; font-size: 20px; font-weight: bold;">영문, 숫자 조합으로 입력하세요.</p>-->
<!--          <p id="numAlert-msg" v-if="numAlert" style="color: red; font-size: 20px; font-weight: bold;"> 핸드폰 번호는 숫자만 입력하세요.</p>-->

          <label for="email_Total">이메일</label>
          <input id="emailid" name="emailId" type="text" placeholder="이메일 주소" v-model="user_email" disabled >
          <div>

            <label for="user_name">이름</label>
            <input type="text" id="username_r" name="member_name" class="username_r" placeholder="이름을 입력하세요" maxlength="20" v-model="user_name" disabled>
          </div>
          <div>
            <label for="userpw_r">비밀번호</label>
            <input type="password" id="userpw_r" name="member_pw" class="userpw_r" placeholder="비밀번호를 입력하세요" maxlength="20" v-model="user_password" disabled>
          </div>
          <div>
            <br>
            <p id="numAlert-msg" v-if="numAlert" style="color: red; font-size: 20px; font-weight: bold;"> 핸드폰 번호는 숫자만 입력하세요.</p>
            <label for="usertell">연락처</label>
            <input id="tel_1" type="tel" name='phone1' value="010" placeholder="010" v-model="tell1" maxlength="3"
                   @keyup="only_number($event)"/> -
            <input id="tel_2" type="tel" name='phone2' v-model="tell2"
                   @keyup="only_number($event)" maxlength="4"/> -
            <input id="tel_3" type="tel" name='phone3' v-model="tell3"
                   @keyup="only_number($event)" maxlength="4"/>
          </div>
          <button type="button" @click="updateRegister()">저장</button>
        </form>
      </div>
    </div>

    <div id="form1" class="form">
      <div id="outsign">
        <h1 class="title" style="font-size: 30px;">회원 탈퇴</h1>
        <p style="margin-top: 40px;"> 계정 및 개인정보 삭제하시겠습니까? </p>
        <b-button style="float: right; margin-right: 30px; margin-top: -50px;"
                  @click="handle_toggle()" v-if="!is_show">
          회원탈퇴
        </b-button>
        <div id="reCheck" style="float: right; margin-top: -100px;" v-show="is_show">
          <p>정말 삭제하시겠습니까?</p>
          <button @click="deleteUser()" type="button">
            삭제
          </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script scope>


import MypageComponent from "@/components/Mypage-component";
import Nav from "@/components/Nav-component";
import axios from "axios";
export default {
  name: "Myprofile-page",
  components: {
    Nav,
    MypageComponent


  },
  data() {
    return {
      user_email : this.user_email,
      user_name : this.user_name,
      user_password : this.user_password,
      user_tell : this.user_tell,
      numAlert : false,
      tell1 : "010", tell2 : this.tell2, tell3 :this.tell3,
      is_show: false,

    }
  },
  mounted() {
    this.myInfo();
  },
  methods: {
    handle_toggle: function(){
      this.is_show = !this.is_show; // #2, #3
    },
    myInfo() {
      axios.get('/api/user/myinfo')
          .then(res => {
            this.user_email = res.data[0].user_email;
            this.user_name = res.data[0].user_name;
            this.user_password = res.data[0].user_password;
            this.user_tell = res.data[0].user_tell;
            this.tell1 = this.user_tell.slice(0,3);
            this.tell2 = this.user_tell.slice(4,8);
            this.tell3 = this.user_tell.slice(9,13);

          }).catch(err => {
      })

      if(sessionStorage.user_email == null){
        alert("로그인 후 이용바랍니다.");
        window.location.href = "/login";
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
    updateRegister() {
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

      const user_email = this.user_email;
      const user_tell = this.tell1 +"-"+ this.tell2 +"-"+ this.tell3;

      const user_info = new Object();
      user_info.user_email = user_email;
      user_info.user_tell = user_tell;

      axios.post('/api/user/update',user_info)
          .then(res =>{
            alert("수정이 완료되었습니다.");
            window.location.href = "/profile";
          }).catch(err => {
        alert("수정에 실패하였습니다. 다시 시도해주세요.");

      })
    },
    //회원탈퇴
    deleteUser() {
      sessionStorage.removeItem('user_email');
      sessionStorage.removeItem('user_name');
      const user_email = this.user_email;
      axios.post('/api/user/delete',
                {user_email})
          .then(res =>{
            if(!res.data==0){
              alert("예매내역이 존재하여 탈퇴가 불가능합니다.");
              return false;
            }else {
              alert("회원탈퇴가 완료되었습니다.");
              window.location.href = "/login";
            }
          }).catch(err => {
        alert("회원탈퇴에 실패하였습니다. 다시 시도해주세요.");
      })
    },
  },
}

</script>


<style scoped>
#Myprofile-page{

}
#user_info{
  margin-top: 150px;
  /*position: relative;*/
}
.userinfolist{
  padding: 30px;
}
#MypageComponent{
  margin-top: 150px;

}
#Nav{
  margin-top: 50px;
  margin-left: 150px;
}
.form {
  /*position: relative;*/
  z-index: 1;
  background: #FFFFFF;
  max-width: 600px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: left;
  box-shadow: 0 0 0px 0 rgba(0, 0, 0, 0), 0 0px 3px 0 rgba(0, 0, 0, 0.9);
  border-radius: 5px 5px 5px 5px / 5px 5px 5px 5px;
}

input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: aliceblue;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 10px 10px 10px 10px / 10px 10px 10px 10px;
}
button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background-color: #889fb9;
  color: #d7fff1;
  width: 100%;
  border: 0;
  padding: 15px;
  font-size: 14px;
  /*  -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;*/
  cursor: pointer;
  border-radius: 10px 10px 10px 10px / 10px 10px 10px 10px;
  max-width: 150px;
  margin-top: 20px;
}
#emailid{
  /*position: relative;*/
  max-width: 200px;
  margin-right: 10px;
  margin-left: 60px;

}
#emailDomain{
  /*position: relative;*/
  max-width: 200px;
  margin: 0 auto 10px;
}
#username_r {
  /*position: relative;*/
  max-width: 250px;
  margin-top: 20px;
  margin-left: 70px;
}
#userpw_r{
  /*position: relative;*/
  max-width: 250px;
  margin-top: 20px;
  margin-left: 40px;
}

#tel_1{
  /*position: relative;*/
  max-width: 100px;
  text-align: center;
  margin-left: 50px;
}
#tel_2{
  /*position: relative;*/
  max-width: 100px;
  margin: 0 auto 10px;
  text-align: center;
}
#tel_3{
  /*position: relative;*/
  max-width: 100px;
  margin: 0 auto 10px;
  text-align: center;
}
#phone{
  margin-left: 90px;
}
#form{
     max-width: 1000px;
    min-width: 800px;
     height: 550px;
     margin-left: 400px;
  /*position: relative;*/
  /*  position: center;*/
}
#form1{
  max-width: 1000px;
  min-width: 800px;
  height: 200px;
  margin-left: 400px;
  /*position: relative;*/
  /*  position: center;*/
}
.title::before {
  content: '';
  width: 5px;
  height: 30px;
  border-radius: 4px;
  background-color: #889fb9;
  position: absolute;
  margin-left: 430px;
  left: 0;
}
#Nav-component{
  margin-left: 140px;
  margin-top: 30px;
}
</style>
